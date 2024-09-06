import {hash,compare} from 'bcrypt'

export async function hashPassword(password:string){
    return await hash(password,10)
}

export async function verifyPassword(password:string,originalPassword:string){
    return await compare(password,originalPassword)
}