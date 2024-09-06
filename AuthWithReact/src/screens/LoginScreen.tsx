import { KeyRound, Mail} from "lucide-react"
import Input from "../components/Input"
import Button from "../components/Button"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { SubmitHandler, useForm } from "react-hook-form"
import Warning from "../components/Warning"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { authorizationUrlGithub,authorizationUrlGoogle, backendUrl } from "../main"
import ThemeToggle from "../components/ThemeToggle"


export type RegisterRequest={
  email:string,
  password:string,
}


function LoginScreen (){
  const {register,handleSubmit,formState:{errors}} =useForm<RegisterRequest>()
  const [isGoogleOauthLoading,setIsGoogleOAuthLoading]=useState(false)
  const [isGithubOauthLoading,setIsGithubOauthLoading]=useState(false)
  const loginUser=async (data:RegisterRequest)=>{
    try{
        const res=await axios.post(`${backendUrl}/auth/login`,data)
        if(res.status===200 && res.data && res.data.token){
            setTimeout(()=>window.location.href='/account/profile',400)
            localStorage.setItem('jwt-token',res.data.token)
        }
        else{
            throw new Error('User')
        }
        return res.data
    }
    catch(e){
        throw new Error(e as string)
    }
}

const googleAuthHandler=()=>{
    setIsGoogleOAuthLoading(true)
    window.location.href=authorizationUrlGoogle
  }
  const {mutate,isError,isPending,error}=useMutation({mutationFn:loginUser})
  const submitHandler:SubmitHandler<RegisterRequest>=async (data:RegisterRequest)=>{
    mutate(data)
  }

  const githubAuthHandler=()=>{
    setIsGithubOauthLoading(true)
    window.location.href=authorizationUrlGithub
  }

  return (
    <div className="w-full h-dvh flex justify-center items-center">
        <div className='md:shadow-xl w-[520px] p-8'>
            <ThemeToggle />
            <h1 className="text-2xl font-extrabold pb-5 md:py-6">Signin to your account</h1>
            {isError ? (
            <div className="pb-3 text-red-500">{error.message}</div>
          ) : null}
            <form
            onSubmit={handleSubmit(submitHandler)}
            className="flex flex-col gap-7 md:gap-4">
              <Input input="text" icon={Mail} placeholder="Email or Username" register={register('email',
                {required:'Email or Username is required'})}/>
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
              <Button daisyStyle="btn-primary justify-center items-center text-white" isLoading={isPending}>
                Login</Button>
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
            
        </div>
    </div>
  )
}

export default LoginScreen