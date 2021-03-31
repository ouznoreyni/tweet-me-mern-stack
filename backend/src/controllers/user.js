const _ = require('lodash')
const winston = require('winston')
const asyncHandler = require('express-async-handler')
const { default: User } = require('../models/user')
import { validateFile } from '../utils/upload'
import { validateUpdate } from '../validations/user'

// @desc    get all users
// @route   GET /api/users
// @access  Private
export const all = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password')
  return res.status(200).json({ users })
})

// @desc    get a user by id
// @route   GET /api/users/:_id
// @access  Private
export const find = asyncHandler(async (req, res) => {
  const { _id } = req.params

  try {
    const user = await User.findById(_id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ message: 'An error happen' })
  }
})
// @desc    get a user profil
// @route   GET /api/users/profil
// @access  Private
export const myProfil = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password')
    return res.status(200).json({ user })
  } catch (error) {
    return res.status(500).json({ message: 'An error happen' })
  }
})

// @desc    Update user profile
// @route   PUT /api/users/profil
// @access  Private
export const updateProfil = asyncHandler(async (req, res) => {
  try {
    //get user
    const user = await User.findById(req.user._id).populate('profil')
    if (!user) {
      return res.status(404).json({ message: 'user not found' })
    }

    //validate data
    const { error } = validateUpdate(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    const profilField = ['avatar', 'bio', 'localisation', 'website']
    let profil = {}
    //update user
    if (req.body['profil']) {
      profil = _.pick(req.body.profil, profilField)
      delete req.body.profil

      if (req.file) {
        const avatar = { contentType: req.file.mimetype, data: req.file.path }
        profil.avatar = avatar
      }
    }
    const data = _.pick(req.body, ['firstName', 'lastName', 'username'])
    const userUpdated = await User.findOneAndUpdate(
      user._id,
      { profil, ...data },
      {
        new: true,
      }
    ).populate('profil')

    return res.status(200).json({
      user: _.pick(userUpdated, [
        '_id',
        'firstName',
        'lastName',
        'username',
        'profil',
        'createdAt',
        'updatedAt',
      ]),
    })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

// @desc    Delete a user
// @route   DELETE /api/users/id
// @access  Private
export const remove = asyncHandler(async (req, res) => {
  const { _id } = req.params

  try {
    const user = await User.findByIdAndDelete(_id).select('-password')
    if (!user) {
      return res.status(404).json({ message: 'user does not exist' })
    }
    return res.status(204).json({ message: 'user delete' })
  } catch (error) {
    return res.status(500).json({ message: 'An error happen' })
  }
})
// @desc    Follow a user
// @route   PUT /api/users/follow
// @access  Private
export const follow = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params

    //user to follow
    const userToFollow = await User.findOne({ _id }).select('-password')

    if (!userToFollow) {
      return res.status(404).json({ message: 'user not found' })
    }
    // set following and follower
    const user = req.user
    if (user.following && user.following.includes(userToFollow._id)) {
      return res.status(500).json({ message: 'user allready followed' })
    }
    user.following.push(userToFollow)
    userToFollow.followers.push(user)

    await user.save()
    await userToFollow.save()

    return res.status(200).json({ user })
  } catch (error) {
    winston.error(error.message)
    return res.status(500).json({ error: error.message })
  }
})

// @desc    Unfollow a user
// @route   PUT /api/users/unfollow
// @access  Private
export const unfollow = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params
    //user to unfollow
    const userToUnFollow = await User.findOne({ _id }).select('-password')

    if (!userToUnFollow) {
      return res.status(404).json({ message: 'user not found' })
    }
    // set unfollowing
    const user = req.user
    if (user.following && !user.following.includes(userToUnFollow._id)) {
      return res.status(500).json({ message: 'user is not followed' })
    }

    const indexOfUserToUnfollow = user.following.indexOf(userToUnFollow._id)
    user.following.splice(indexOfUserToUnfollow, 1)

    const indexOfUserfollowed = userToUnFollow.followers.indexOf(user._id)
    userToUnFollow.followers.splice(indexOfUserfollowed, 1)
    await user.save()
    await userToUnFollow.save()

    return res.status(200).json({ user: 'unfollowed' })
  } catch (error) {
    winston.error(error.message)
    return res.status(500).json({ error: error.message })
  }
})
