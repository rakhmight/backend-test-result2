import { Response, Request } from 'express';

export const signup = (req:RequestInst<SignUpReq>, res:Response) => {
    
}

export const signin = (req:RequestInst<SigninReq>, res:Response) => {
    
}

export const logout = (req:RequestInst<LogoutReq>, res:Response) => {
    
}

export const refresh = (req:RequestInst<RefreshReq>, res:Response) => {
    
}

export const deleteUser = (req:RequestInst<{}, UserID>, res:Response) => {
    
}

export const getUser = (req:RequestInst<{}, UserID>, res:Response) => {
    
    res.send(req.params.id);
}

export const getUsers = (req:Request, res:Response) => {
    req.log.info('Get users!')
    res.send('Have a good day')
}