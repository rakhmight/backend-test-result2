import 'dotenv/config'
import express from 'express'

import cors from 'cors'
import pino from 'pino-http'
import cookieParser from 'cookie-parser'
import { sequelize } from './services/db'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(pino())

const server = async () => {
    try {
        app.listen(process.env.SERVER_PORT, async () => {
            console.log(`(Server starter): Server started successfully on port ${process.env.SERVER_PORT}`)

            try {
                const hello = await sequelize.authenticate()
                console.log('Connection has been established successfully.', hello);
              } catch (error) {
                console.error('Unable to connect to the database:', error);
              }
        })
    } catch (error) {
        console.error('(Server starter): '+(error as Error).message)
        process.exit(1)
    }
}

server()