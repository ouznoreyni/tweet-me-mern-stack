const express = require('express')
const auth = require('../routes/auth')
const user = require('../routes/user')
const tweets = require('../routes/tweets')
const { protect } = require('../middleware/auth')

module.exports = (app) => {
  app.use('/api/users', user)
  app.use('/api/tweets', [protect], tweets)
  app.use('/api', auth)
  app.use('/', (req, res) => {
    res.json({ message: 'Welcome tweeter-me api' })
  })
}
