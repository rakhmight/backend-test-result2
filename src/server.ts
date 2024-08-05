import 'dotenv/config'
import express from 'express'

import cors from 'cors'
import pino from 'pino-http'
import cookieParser from 'cookie-parser'
import { db } from './models'

import userRouters from './router/users-router/usersRouter'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(pino())

app.use("/api/v1/users", userRouters)

const server = async () => {
    try {
        app.listen(process.env.SERVER_PORT, async () => {
            console.log(`[Server starter] Server started successfully on port ${process.env.SERVER_PORT}`)

            try {
                db.sequelize.sync();
            } catch (error) {
              console.error('[MySQL] Unable to connect to the database:', error);
              process.exit(1)
            }
            
        })

        app.get('/', (req, res) => {})
    } catch (error) {
        console.error('[Server starter]: '+(error as Error).message)
        process.exit(1)
    }
}

server()