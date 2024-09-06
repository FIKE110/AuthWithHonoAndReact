import { ReactNode} from "react"

type ButtonType={
    daisyStyle:string,
    children:ReactNode | ReactNode[],
    isLoading?:boolean,
    spinnerText?:string,
    handler?:()=>void
}


const Button = ({daisyStyle,children,isLoading,spinnerText,handler}:ButtonType) => {
  return (
    <button className={`btn btn-active no-animation justify-start gap-8 px-8 text-[15px] ${daisyStyle}` }
    onClick={handler}
    >
       { !isLoading ? 
       children
        : <><span className="loading loading-spinner"></span>{spinnerText}</>}
    </button>
  )
}

export default Button