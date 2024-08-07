import { Sequelize } from 'sequelize'
import UsersModel from './user-model/users.model'
import FilesModel from './file-model/files.model'

const sequelize = new Sequelize(process.env.DB_DATABASE!, process.env.DB_USER!, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
})

export const db:DBInstance = {
    sequelize,
    users: UsersModel(sequelize),
    files: FilesModel(sequelize)
}