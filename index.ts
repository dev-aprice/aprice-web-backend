import express from 'express'
import morgan from 'morgan'
import session from 'express-session'
import cors from 'cors'
import db from './config/db'
import router from './src/routes'

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('tiny'))

if (!process.env.SECRET || !process.env.NAME) {
  console.error('Environment variables SECRET and NAME must be defined.')
  process.exit(1)
}

app.use(
  session({
    secret: process.env.SECRET,
    name: process.env.NAME, 
    resave: false,
    saveUninitialized: false,
  })
)

app.use('/api', router)

const PORT = process.env.PORT || 3000

app.listen(PORT, async () => {
  try {
    await db.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
  console.log(`Server running on port ${PORT}`)
})
