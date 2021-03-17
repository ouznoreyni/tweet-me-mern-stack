const express = require('express')
const auth = require('../routes/auth')

module.exports = (app) => {
  app.use('/api/v1/', auth)
  app.use('/', (req, res) => {
    res.json({ message: 'Welcome tweeter-me api' })
  })
}
