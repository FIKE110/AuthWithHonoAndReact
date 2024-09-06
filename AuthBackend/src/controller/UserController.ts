import { Context } from "hono";
import { prisma } from "../db/db";
import { hashPassword, verifyPassword } from "../lib/passwordencoder";
import { generateToken } from "../lib/jwtService";
import { GoogleAuth ,GithubAuth,oauth2Client} from "..";

export async function RegisterUserController(c:Context){
    try{
        const {username,password,email}=await c.req.json()
        const User=await prisma.user.findFirst({where:{OR:[{username:username},{email:email}]}})
        if(User) return User?.username===username ? c.json({error:"Username already exist"}) : c.json({error:"Email already taken"})
            const newUser=await prisma.user.create({
            data:{
                username:username,
                email:email,
                password:await hashPassword(password)
            }
        })
        c.status(201)
        return c.json({username:newUser.username,email:newUser.email,createdAt:newUser.createdAt})
    }
    catch(e:any){
        c.status(500)
        return c.json({error:"Server error"})
    }
}

export async function LoginUserController(c:Context){
    try{
        const {email,password}=await c.req.json()
        const User=await prisma.user.findFirst({where:{googleId:null,githubId:null,OR:[{email:email},{username:email}]}})
        if(User && User.password && await verifyPassword(password,User.password)){
            return c.json({token:generateToken({id:User.id})})
        }
        c.status(404)
        return c.json({error:"Invalid Username or Password"})
    }
    catch(e:any){
        return c.body(e)
    }
}

export async function GetUserProfileController(c:Context){
    try{
        const id=c.get('user')
        const User=await prisma.user.findFirst({
            where:{
                id:id
            }
        })

        if(User){
            const {username,email,createdAt,profileImage}=User
            return c.json({username,email,createdAt,profileImage})
        }
        else{
            c.status(404)
            return c.json({error:'User not found'})
        }
    }
    catch(e:any){
        return c.body(e)
    }
}


export async function GoogleAuthController(c:Context){
    const [url]=await GoogleAuth.getAuthorizationUrl()
    return c.redirect(url.toString())
  }

export async function GoogleAuthCallbackController(c:Context){
    const code=c.req.query('code')
    if(!code) return c.json({error:"No Authenticated user found"})
    
      const {tokens} = await oauth2Client.getToken(code)
      oauth2Client.setCredentials(tokens)
      try{
      const userProfileData=await fetch('https://www.googleapis.com/oauth2/v3/userinfo',{
        headers:{
          'Authorization':`Bearer ${tokens.access_token}`
        }
      })
  
      const userProfile=await userProfileData.json()
      const {picture,email,sub,name}=userProfile
      const User=await prisma.user.findFirst({where:{googleId:sub }})
  
      let token=''
      if(User){
        token=generateToken({id:User.id})
      }
      else{
        c.status(201)
        const newUser=await prisma.user.create({
          data:{
            googleId:sub,
            username:name,
            email:email,
            profileImage:picture
          }
        })
  
        token=generateToken({id:newUser.id})
      }
  
      return c.redirect(`${process.env.FRONTEND_URL}?token=${token}`)
      }
      catch(e){
        return c.json({error:e})
      }
  }

  export async function GithubAuthController(c:Context){
    try{
        const [url,state]=await GithubAuth.getAuthorizationUrl()
        return c.redirect(url.toString())
    }
    catch(e){
        console.log(e)
        c.status(400)
        return c.json({error:"Error occured"})
    }
  }

  export async function GithubAuthControllerCallback(c:Context){
    try{
        const code=c.req.query('code')
        if(!code) return c.json({error:"Invalid github token"})
        const {githubUser}=await GithubAuth.validateCallback(code)
        const {login,email,id,avatar_url}=githubUser
        console.log(githubUser)
        if(login && id){
            const existingUser=await prisma.user.findFirst({where:{OR:[{githubId:id.toString()}]}})
            let token=''
            if(existingUser){
                token=generateToken({id:existingUser.id})
                return c.redirect(`${process.env.FRONTEND_URL}?token=${token}`)
            }
            else{
                console.log("here")
                const newUser=await prisma.user.create({data:{
                    username:login,
                    email:email || 'Github email is set to private',
                    githubId:id.toString(),
                    profileImage:avatar_url
                }})
                
                token=generateToken({id:newUser.id})
                return c.redirect(`${process.env.FRONTEND_URL}?token=${token}`)
            }
        } 

        c.status(400)
        return c.json({error:"Authorization failed"})
    }
    catch(e){
        return c.json({error:e})
    }
  }