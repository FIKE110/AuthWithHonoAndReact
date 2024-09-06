import { Context ,Next} from "hono";
import { UserSchema } from "../schema/User";
import { verifyToken } from "../lib/jwtService";

export async function RegisterValidator(c:Context,next:Next){
    const {username,email,password} =await c.req.json()
    try{
        UserSchema.parse({username,password,email})
        await next()
    }
    catch(e:any){
        console.log(e)
        return c.json({error:e})
    }
}

export async function ProfileMiddleware(c:Context,next:Next){
    const token=c.req.header('Authorization')?.substring(7)
    if(token){
      const User=verifyToken(token)
      if(User.id){
        c.set('user' as never,User.id)
        await next()
      }
      else{
        c.status(401)
      return c.json({error:"Token is expired"})
      }
    }
    
    else{
      c.status(401)
      return c.json({error:"Not Authorized"})
    }
  }