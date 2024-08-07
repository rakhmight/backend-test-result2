import 'dotenv/config'
import { RedisOptions } from 'ioredis'

export const redisParams:RedisOptions = { 
    host: process.env.REDIS_DB_HOST!,
    port: +process.env.REDIS_DB_PORT!,
    password: process.env.REDIS_DB_PASSWORD!,
    family: 4,
    db: +process.env.REDIS_DB_INDEX!
}