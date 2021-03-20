const express = require('express')
const auth = require('../routes/auth')
const user = require('../routes/user')

module.exports = (app) => {
  app.use('/api', auth)
  app.use('/api/users', user)
  app.use('/', (req, res) => {
    res.json({ message: 'Welcome tweeter-me api' })
  })
}
