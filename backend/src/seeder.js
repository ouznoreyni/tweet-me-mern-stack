const mongoose = require('mongoose')
const dotenv = require('dotenv')
const winston = require('winston')
const users = require('./data/users')
const DB_CONNECTION = require('./startup/db')
require('dotenv').config()

DB_CONNECTION()

const importData = async () => {
  console.log('ok')
  // try {
  //   await User.deleteMany()

  //   const createdUsers = await User.insertMany(users)

  //   console.log('Data Imported!')
  //   process.exit()
  // } catch (error) {
  //   console.error(`${error}`)
  //   process.exit(1)
  // }
}

const destroyData = async () => {
  console.log('====================================')
  console.log('data deleted')
  console.log('====================================')
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
