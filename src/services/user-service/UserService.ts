import UserDTO from "../../dtos/user/UserDTO";
import { db } from "../../models";
import { comparePasswords, preparePassword } from "../password-service/PasswordService";
import { findToken, generateTokens, removeToken, saveToken, validateToken } from "../token-service/TokenService";
import generateRandomString from '../../utils/generateRandomString'
import path from 'path'
import fs from 'fs'


export async function registration(userData:Omit<UserData, 'userID' | 'sessionID' | 'refreshToken'>){
    
    const candidate = await db.users.findOne({ where: { id: userData.id } })

    if(candidate) throw Error('user-exist')

    const newUser = {
       id: userData.id,
       fullName: userData.fullName,
       password: await preparePassword(userData.password) 
    }

    const user = await db.users.create(newUser)
    fs.mkdir(path.join(__dirname, `../store/user-${user.userID}-store}`), { recursive: true }, (err) => {
        if (err) {
            return console.error(err);
        }
    })
    
    return prepareUserData(user)
}


export async function login(userData:Pick<UserData, 'id' | 'password'>){
    const user:UserI = await db.users.findOne({ where: { id: userData.id }})
    if(!user) throw Error('not-found')

    const isPasswordEquals = await comparePasswords(user.password, userData.password)
    if(!isPasswordEquals) throw Error('pwd-wrong')

    return prepareFullUserData(user)
}


export async function logoutUser(userID:number, sessionID: string){
    const tokenData = await removeToken(userID, sessionID)

    return tokenData
}


export async function refreshTokens(refreshToken:string, userID:number, sessionID: string){
    const user = await db.users.findOne({ where: { userID } })
    if(!user) throw Error('not-found')
        console.log("user :", user);
        

    const userData = await validateToken(refreshToken)
    console.log("userData:", userData);
    
    const tokenFromDB = await findToken(userID, sessionID)
    console.log("tokenFromDB:", tokenFromDB);
    if(!userData || !tokenFromDB) throw Error('un-auth')
    const tokenData = await removeToken(userID, sessionID)

    if(tokenData) return prepareFullUserData(user)
}


export async function getUserMethod(userID: number){
    const userData = await db.users.findOne({
        where: {
            userID
        }
    })

    return prepareUserData(userData)
}


export async function deleteUser(userID: number){
    const userData = await db.users.destroy({
        where: {
            userID
        }
    })

    return userData
}

function prepareUserData(userData: UserI){
    const userDTO = UserDTO(userData)

    return userDTO
}

async function prepareFullUserData(user:UserI){
    const sessionID = generateRandomString(32)
    const userDTO = { ...UserDTO(user), sessionID }

    const tokens = await generateTokens(userDTO)
    const tokenData = await saveToken(userDTO.userID, sessionID, tokens.refreshToken)

    if(tokenData) return {
        ...tokens,
        sessionID,
        user: userDTO
    }
}