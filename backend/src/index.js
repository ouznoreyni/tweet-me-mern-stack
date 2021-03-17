const express = require('express')
const winston = require('winston')
const morgan = require('morgan')
const DB_CONNECTION = require('./startup/db')
const userRouter = require('./routes/user')
const logger = require('./startup/logging')
require('dotenv').config()

DB_CONNECTION()

const app = express()
app.use(express.json())

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  )
}
require('./startup/routes')(app)

const PORT = process.env.PORT
app.listen(PORT, () => winston.info(`Listening on port ${PORT}...`))
