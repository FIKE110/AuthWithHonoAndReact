import { ReactNode } from 'react'

const Warning = ({children}:{children:ReactNode | ReactNode[] | string}) => {
  return (
    <p className='text-red-500 text-sm'>
        {children}
    </p>
  )
}

export default Warning