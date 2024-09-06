import { Eye, EyeOff, LucideIcon } from "lucide-react"
import { forwardRef, ReactNode, useState } from "react"
import { UseFormRegisterReturn } from "react-hook-form"

type InputType={
    input:string,
    placeholder:string,
    icon:LucideIcon,
    children?:ReactNode | ReactNode[],
    register?:UseFormRegisterReturn,
    pw?:boolean
}


const Input =forwardRef<HTMLInputElement,InputType>(({input,placeholder,icon:Icon,children,register,pw} :InputType ,ref) => {
  const [showValue,setShowValue]=useState(!pw)
  
  return (
    <label className="input input-bordered flex items-center gap-2">
        <Icon size={21}/>
        <input type={showValue ? input : 'text'} className="grow input-sm text-md md:input-sm" placeholder={placeholder} ref={ref} {...register}/>  
        {children}
        {pw && (showValue ? <EyeOff onClick={()=>setShowValue(prev=>!prev)}/> :<Eye onClick={()=>setShowValue(prev=>!prev)}/>)}
    </label>   
  )
})

export default Input