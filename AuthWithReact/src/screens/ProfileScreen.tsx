import { useQuery } from "@tanstack/react-query"
import axios, { isAxiosError } from "axios"
import ThemeToggle from "../components/ThemeToggle"
import { useState } from "react"
import { profileUrl } from "../main"


type ProfileDataType={
    username:string,
    email:string,
    createdAt:Date | string,
    profileImage?:string
}
const fetchUserProfile=async ()=>{
    try{
    const res=await axios.get(profileUrl ,{
        headers:{
            'Authorization':`Bearer ${localStorage.getItem('jwt-token')}`
        }
    })

    if(!(res.status===200)){
        window.location.href='/auth/login'
        return 
    }
    const profile=await res.data
    return profile
}
    catch(e:unknown){
        if(isAxiosError(e) && e.response  && e.response.status===401) {window.location.href="/auth/login"}
        throw new Error(e as string)
    }
}

function ProfileScreen () {

    const {data,isPending,error,refetch}= useQuery<ProfileDataType>({
        queryKey:['profileKey'],
        queryFn:fetchUserProfile
    })

    const [showCustomImg,setShowCustomImg]=useState(false)

  return (
    <>
    <ThemeToggle />
    {isPending && (
        <div className="min-h-screen  flex items-center justify-center">
         <div className="card w-96 bg-white md:shadow-xl m-auto">
         <div className="card-body items-center text-center">
           <div className="avatar">
             <div className="w-24 rounded-full bg-gray-300 animate-pulse"></div>
           </div>
           <h2 className="card-title mt-4 text-lg font-semibold bg-gray-300 w-32 h-6 rounded-md animate-pulse"></h2>
           <p className="text-sm bg-gray-300 w-40 h-4 rounded-md animate-pulse"></p>
           <p className="text-sm bg-gray-300 w-56 h-4 mt-2 rounded-md animate-pulse"></p>
           <div className="card-actions mt-4">
             <button className="btn btn-primary btn-disabled animate-pulse">Loading...</button>
             <button className="btn btn-outline btn-secondary btn-disabled animate-pulse">Loading...</button>
           </div>
         </div>
       </div>
       </div>
    )}
    {data && (
        <div>
    <div className="min-h-screen  flex items-center justify-center">
      <div className="card w-96 md:shadow-xl">
        <div className="card-body items-center text-center">
        <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-24 rounded-full">
              {data.profileImage && !showCustomImg? (<div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
    {!showCustomImg && <img src={data.profileImage} onError={()=>setShowCustomImg(true)}/>}
  </div>)  : <span className="text-3xl">{data.username.split(" ").map(name=>name[0]).join("")}</span>}
            </div>
        </div>
          <h2 className="card-title mt-4 text-lg font-semibold">{data.username}</h2>
          <p className="text-sm text-gray-400">{data.email}</p>
          <p className="text-sm text-gray-400">Account created -- {`${new Date(data.createdAt).getDate()}/${new Date(data.createdAt).getMonth()+1}/${new Date(data.createdAt).getFullYear()}`}</p>
          <div className="card-actions mt-4">
            <button className="btn btn-outline btn-secondary" onClick={()=>{
                localStorage.removeItem('jwt-token')
                window.location.href='/auth/login'
            }}>Logout</button>
          </div>
        </div>
      </div>
    </div>
    </div>)
    }
    {error && (<div className="min-h-screen flex items-center justify-center">
          <div className="card w-96 bg-red-100 md:shadow-xl">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-lg font-semibold text-red-600">Error</h2>
              <p className="text-sm text-red-500">Failed to load user data. Please try again.</p>
              <div className="card-actions mt-4">
                <button className="btn btn-outline btn-error" onClick={()=>refetch()}>
                  Retry
                </button>
              </div>
            </div>
          </div></div>)}
    </>
  )
}

export default ProfileScreen