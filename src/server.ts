import 'dotenv/config'
import express from 'express'
import Redis from 'ioredis'
import cors from 'cors'
import pino from 'pino-http'
import cookieParser from 'cookie-parser'
import fileUpload from 'express-fileupload'
import path from 'path'
import fs from 'fs'

import { db } from './models'

import usersRouters from './router/users-router/usersRouter'
import filesRouters from './router/files-router/filesRouter'

import { pinoConfig } from './config/pino'
import { redisParams } from './config/redis'
import getHostAddress from './utils/getHostAddress'

if(!fs.existsSync(path.join(__dirname, `./store`))){
    fs.mkdir(path.join(__dirname, `./store`), { recursive: true }, (err) => {
        if (err) {
            return console.error(err);
        }
        console.log(`[Server starter] Server store init`)
    })
}

const app = express()
checkServerEnv()

export const redis = new Redis(redisParams)

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({}))
app.use(pino(pinoConfig))

app.use("/api/v1/users", usersRouters)
app.use("/api/v1/files", filesRouters)

const server = async () => {
    try {
        // const testRedisConnection = await redis.ping()
        // console.log(testRedisConnection);        

        const hostAddress = getHostAddress()
        app.listen(+process.env.SERVER_PORT!, hostAddress, async () => {
            console.log(`[Server starter] Server started successfully on: ${hostAddress}:${process.env.SERVER_PORT}`)

            try {
                db.sequelize.sync();
            } catch (error) {
                console.error('[MySQL] Unable to connect to the database:', error);
                process.exit(1)
            }
            
        })
    } catch (error) {
        console.error('[Server starter]: '+(error as Error).message)
        process.exit(1)
    }
}

server()

function checkServerEnv(){
    if(!process.env.SERVER_PORT){
        console.error('Set a server port env variable')
        process.exit(1)
    }
    
    if(!process.env.REDIS_DB_HOST || !process.env.REDIS_DB_PORT || !process.env.REDIS_DB_PASSWORD || !process.env.REDIS_DB_INDEX){
        console.error('The environment variable responsible for connecting to the Redis database is not set')
        process.exit(1)
    }
    
    if(!process.env.JWT_PRIVATE_KEY || !process.env.JWT_PUBLIC_KEY){
        console.error('The environment variable responsible for jwt signing is not set')
        process.exit(1)
    }
}