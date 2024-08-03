import 'dotenv/config'
import { Sequelize } from 'sequelize'

export const query = async (sql: string, value?:object) => {
    try {
        const sequelize = new Sequelize(process.env.DB_DATABASE!, process.env.DB_USER!, process.env.DB_PASSWORD, {
            host: process.env.DB_HOST,
            dialect: 'mysql'
        });

        const data = await sequelize.query(sql, value)

        sequelize.close()
        return data        
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}