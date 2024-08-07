import { Request, Response, NextFunction } from 'express'
import { findToken, validateToken } from '../services/token-service/TokenService'

export async function checkAuthMiddleware (req:Request, res:Response, next: NextFunction) {
    try {        
        if(!req.headers.authorization) return res.status(403).json({ error: "Forbidden" })

        const accessToken = req.headers.authorization.split(' ')[1]
        if(!accessToken) return res.status(403).json({ error: "Forbidden" })            
    
        const userData = await validateToken(accessToken)
        if(!userData) return res.status(403).json({ error: "Forbidden" })
    
            
        const tokenFromDb = await findToken((userData as UserDTOI).userID, (userData as UserDTOI&{sessionID: string}).sessionID!)
        if(!tokenFromDb) return res.status(403).json({ error: "Forbidden" })

        next()
    } catch (error) {
        return res.status(500).json({ error: (error as Error).message })
    }
}