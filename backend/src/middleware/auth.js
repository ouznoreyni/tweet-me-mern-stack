const jwt = require('jsonwebtoken')
const winston = require('winston')
const asyncHandler = require('express-async-handler')
const { default: User } = require('../models/user')

export const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY)

      req.user = await User.findById(decoded._id).select('-password')

      next()
    } catch (error) {
      winston.error(error)
      return res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token failed' })
  }
})

export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    return res.status(401).json({ message: 'Not authorized as an admin' })
  }
}
