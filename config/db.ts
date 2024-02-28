import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

const envPath =
  process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
dotenv.config({ path: envPath })


const db = new Sequelize(
  process.env.MYSQLDATABASE as string,
  process.env.MYSQLUSER as string,
  process.env.MYSQLPASSWORD as string,
  {
    host: process.env.MYSQLHOST as string,
    port: parseInt(process.env.MYSQLPORT as string, 10),
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
)

export default db
