import 'dotenv/config'
import express from 'express'

import cors from 'cors'
import pino from 'pino-http'
import cookieParser from 'cookie-parser'
import { db } from './models'
import getHostAddress from './utils/getHostAddress'

import userRouters from './router/users-router/usersRouter'
import { pinoConfig } from './config/pino'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(pino(pinoConfig))

app.use("/api/v1/users", userRouters)

const server = async () => {
    try {
        checkServerEnv()

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
}