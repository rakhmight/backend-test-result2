import jwt, { JwtPayload } from 'jsonwebtoken'
import { redis } from '../../server'

const privateKey = process.env.JWT_PRIVATE_KEY!
const publicKey = process.env.JWT_PUBLIC_KEY!

export async function generateTokens(payload:UserDTOI&{sessionID: string}){
    const accessToken = await jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '10m' })
    const refreshToken = await jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '7d' })
    
    return {
        accessToken,
        refreshToken
    }
}


export async function saveToken(userID:number, sessionID: string, refreshToken: string){
    const tokenData = await redis.set(`${userID}-${sessionID}-rToken`, refreshToken, 'EX', 7*24*60*60)
    return tokenData
}


export async function removeToken(userID:number, sessionID: string){
    const tokenData = await redis.del(`${userID}-${sessionID}-rToken`)
    return tokenData
}


export async function validateToken(token:string,){
    try {
        const userData = await jwt.verify(token, publicKey)
        return userData
    } catch (error) {
        console.log(error);
        
        return null
    }

}


export async function findToken(userID:number, sessionID: string){    
    const tokenData = await redis.get(`${userID}-${sessionID}-rToken`)
    return tokenData

}