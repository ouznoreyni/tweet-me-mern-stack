const _ = require('lodash')
const { validateUser } = require('../validations/user')
const asyncHandler = require('express-async-handler')
const { default: User } = require('../models/user')
// @desc    Auth user & get token
// @route   POST /api/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  //validate user data
  const { error } = validateUser(req.body, true)
  if (error) {
    return res.status(400).json({ message: error.details[0].message })
  }

  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) {
    return res.status(401).json({ message: 'login or password incorrect' })
  }
  const passwordMatch = await user.matchPassword(password)
  if (!passwordMatch) {
    return res.status(401).json({ message: 'login or password incorrect' })
  }
  const token = user.generateToken()
  return res.status(200).json({ token })
})
// @desc    Register a new user
// @route   POST /api/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  try {
    //validate user data
    const { error } = validateUser(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const { username } = req.body
    const userExiste = await User.findOne({ username })
    if (userExiste) {
      return res.status(400).json({ message: 'user already existe' })
    }

    // //createUser
    const user = await User.create(
      _.pick(req.body, ['firstName', 'lastName', 'username', 'password'])
    )
    // //return token
    const token = user.generateToken()
    delete user['password']
    return res.status(201).json({
      user: _.pick(user, [
        '_id',
        'firstName',
        'lastName',
        'username',
        'createdAt',
      ]),
      token,
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

export { login, register }
