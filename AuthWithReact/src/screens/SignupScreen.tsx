import { KeyRound, Mail, User } from "lucide-react"
import Input from "../components/Input"
import Button from "../components/Button"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { SubmitHandler, useForm } from "react-hook-form"
import Warning from "../components/Warning"
import { useState } from "react"
import { authorizationUrlGithub,authorizationUrlGoogle, registerUrl } from "../main"
import axios from "axios"
import { useMutation} from "@tanstack/react-query"
import ThemeToggle from "../components/ThemeToggle"
import SignInPrompt from "../components/SignUp"


export type RegisterRequest={
  username:string,
  email:string,
  password:string,
}


function SignupScreen (){
  const {register,handleSubmit,formState:{errors}} =useForm<RegisterRequest>({defaultValues:{
    username:"Fortune",
    email:"chihurum@gmail.com",
    password:'Fortune!.'
  }})

  const [isGoogleOauthLoading,setIsGoogleOAuthLoading]=useState(false)
  const [isGithubOauthLoading,setIsGithubOauthLoading]=useState(false)
  const [created,setCreated]=useState(false)
  const signupHandler=async (data:RegisterRequest)=>{
    try{
      const res=await axios.post(registerUrl,data)
      if(res.status===201){
        setCreated(true)
        setTimeout(()=>window.location.href="/auth/login",1200)
      }
      else{
        throw new Error(res.data.error)
      }
      return res.data
    }
    catch(e){
      throw new Error(e as string)
    }
  }
  const mutation=useMutation({mutationFn:signupHandler})

  const submitHandler:SubmitHandler<RegisterRequest>=async (data)=>{
    console.log(data)
    setIsGithubOauthLoading(true)
    setIsGoogleOAuthLoading(true)
    mutation.mutate(data)
    setIsGithubOauthLoading(false)
    setIsGoogleOAuthLoading(false)
  }

  const googleAuthHandler=()=>{
    setIsGoogleOAuthLoading(true)
    window.location.href=authorizationUrlGoogle
  }

  const githubAuthHandler=()=>{
    setIsGithubOauthLoading(true)
    window.location.href=authorizationUrlGithub
  }

  return (
    <div className="w-full h-dvh flex justify-center items-center">
        <div className='md:shadow-xl w-[520px] p-8'>
          <ThemeToggle />
            <h1 className="text-2xl font-extrabold pb-5 md:py-6">Create your account</h1>
            {mutation.isError ? (
            <div className="pb-3 text-red-500">{mutation.error.message}</div>
          ) : null}
          {created ? (
            <div className="pb-3 text-green-500 ">User Successfully created</div>
          ) : null}
            <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-4">
              <Input input="text" icon={User} placeholder="Username" register={register('username',
                {required:'Username is required',minLength:{
                  value:4,
                  message:'Username must be at least 4 characters in length'
                },maxLength:{value:200,message:'Username cannot exceed 200 characters'}})}/>
                {errors.username && <Warning>{errors.username.message}</Warning>}
              <Input input="text" icon={Mail} placeholder="Email" register={register('email',
                {required:'Email is required',pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: 'Enter a valid email address',
                },})}/>
                 {errors.email && <Warning>{errors.email.message}</Warning>}
              <Input input="password" icon={KeyRound} placeholder="Password" pw register={register('password',
                {required:'Password is required',minLength:{
                  value:6,
                  message:"Password must be least 6 characters long"
                },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                  message: 'Password must contain at least one uppercase letter and one symbol',
                }
                ,maxLength:{
                  value:200,
                  message:"Password must not excced 200 characters"
                }})}/>
                 {errors.password && <Warning>{errors.password.message}</Warning>}
              <Button daisyStyle="btn-primary justify-center items-center text-white" isLoading={mutation.isPending}>
                Continue</Button>
            </form>
            <div className="divider">or</div>
            <div className="flex flex-col gap-6">
                <Button daisyStyle="btn-primary text-white w-full"
                spinnerText="Continue with Google"
                handler={googleAuthHandler}
                isLoading={isGoogleOauthLoading}><FaGoogle size={18}
                /> Continue with Google</Button>
                <Button daisyStyle="btn-primary text-white w-full"
                isLoading={isGithubOauthLoading}
                handler={githubAuthHandler}
                spinnerText="Continue with Github"
                ><FaGithub size={18}
                /> Continue with Github</Button>
            </div>
            <SignInPrompt firstLine="Have an account?" signInPath='/auth/login' text='login'/>
        </div>
    </div>
  )
}

export default SignupScreen