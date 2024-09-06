import {verify,sign} from 'jsonwebtoken'

export type BearerTokenType={
    id?:number,
}

const secretKey=process.env.JWT_SECRET_KEY as any
const expiresIn=process.env.JWT_EXPIRES

export function generateToken(payload:BearerTokenType){
    const jwt=sign(payload,secretKey,{
        algorithm:'HS256',
        issuer:'AuthMap',
        expiresIn:expiresIn
    })

    return jwt
}


export function verifyToken(token:string):BearerTokenType{
    try{
        const body:BearerTokenType=verify(token,secretKey) as BearerTokenType
        return body
    }
    catch(e){
        return {}
    }
}


