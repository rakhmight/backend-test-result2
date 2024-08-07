declare interface UserData extends UserI {
    sessionID: string,
    refreshToken: string
}

declare interface SignUpReq {
    data: Omit<UserData, 'userID' | 'sessionID' | 'refreshToken'>
}

declare interface UserID {
    id: string
}

declare interface SigninReq{
    data: Pick<UserData, 'id' | 'password'>
}

declare interface LogoutReq{
    data: Pick<UserData, 'userID' | 'sessionID'>
}

declare interface RefreshReq{
    data: Pick<UserData, 'userID' | 'sessionID' | 'refreshToken'>
}