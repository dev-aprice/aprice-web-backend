import express from 'express'
import morgan from 'morgan'
import db from './config/db'
import router from './src/routes'
import cors from 'cors'

const app = express()

app.use(cors())

app.use(express.json())

app.use(morgan('tiny'))

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
