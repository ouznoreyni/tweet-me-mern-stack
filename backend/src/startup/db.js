const mongoose = require('mongoose')
const winston = require('winston')

module.exports = async () => {
  try {
    const connexion = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })
    winston.info(`MongoDB Connected: ${connexion.connection.host}`)
  } catch (error) {
    winston.error(`Error: ${error.message}`)
    process.exit(1)
  }
}
