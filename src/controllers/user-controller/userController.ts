import { Response } from 'express';
import { deleteUser, getUserMethod, login, logoutUser, refreshTokens, registration } from '../../services/user-service/UserService';

export const signup = async (req:RequestInst<SignUpReq>, res:Response) => {
    try {
        const userData = await registration(req.body.data)
        res.status(200).json(userData)
    } catch (error) {
        req.log.error(error);
        res.status(500).json({ error: (error as Error).message })
    }
}

export const signin = async (req:RequestInst<SigninReq>, res:Response) => {
    try {        
        const { refreshToken } = req.cookies

        if(refreshToken) return res.status(400).json({ error: 'You are login! Refresh tokens pair' })

        const userData = await login(req.body.data)
        return res.status(200)
        .cookie('refreshToken', userData!.refreshToken, {  maxAge: 7*24*60*60*1000, httpOnly: true, path: '/' })
        .cookie('userID', userData!.user.userID, {  maxAge: 7*24*60*60*1000, httpOnly: true, path: '/' })
        .cookie('sessionID', userData!.sessionID, {  maxAge: 7*24*60*60*1000, httpOnly: true, path: '/' })
        .json(userData)
    } catch (error) {
        req.log.error(error);
        return res.status(500).json({ error: (error as Error).message })
    }
}

export const logout = async (req:RequestInst<LogoutReq>, res:Response) => {
    try {
        const { sessionID, userID } = req.body.data
        const tokenData = await logoutUser(userID, sessionID)

        if(!tokenData) return res.status(400).json({ error: 'Bad request (sessionID or userID)' })
        return res.status(200)
        .clearCookie('refreshToken')
        .clearCookie('userID')
        .clearCookie('sessionID')
        .json(tokenData)
    } catch (error) {
        req.log.error(error);
        return res.status(500).json({ error: (error as Error).message })
    } 
}

export const refresh = async (req:RequestInst<RefreshReq>, res:Response) => {
    try {
        const { refreshToken, userID, sessionID } = req.cookies
        if(!refreshToken || !userID || !sessionID) return res.status(400).json({ error: 'refreshToken not found' })

        const userData = await refreshTokens(refreshToken, userID, sessionID)

        return res.status(200)
        .cookie('refreshToken', userData!.refreshToken, {  maxAge: 7*24*60*60*1000, httpOnly: true, path: '/' })
        .cookie('userID', userData!.user.userID, {  maxAge: 7*24*60*60*1000, httpOnly: true, path: '/' })
        .cookie('sessionID', userData!.sessionID, {  maxAge: 7*24*60*60*1000, httpOnly: true, path: '/' })
        .json(userData)
    } catch (error) {
        req.log.error(error);
        return res.status(500).json({ error: (error as Error).message })
    }
}

export const delUser = async (req:RequestInst<{}, UserID>, res:Response) => {
    try {
        if(!req.params.id || isNaN(+req.params.id)){
            return res.status(400).json({ error: 'Bad request' })
        }
        
        const userData = await deleteUser(+req.params.id)

        res.status(200).json(userData)
    } catch (error) {
        req.log.error(error);
        return res.status(500).json({ error: (error as Error).message })
    }
}

export const getUser = async (req:RequestInst<{}, UserID>, res:Response) => {
    try {
        if(!req.params.id || isNaN(+req.params.id)){
            return res.status(400).json({ error: 'Bad request' })
        }
        
        const userData = await getUserMethod(+req.params.id)
        return res.status(200).json(userData)
        
    } catch (error) {
        req.log.error(error);
        return res.status(500).json({ error: (error as Error).message })
    }
}