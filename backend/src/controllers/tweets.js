import Tweet from '../models/tweet'
import { validateTweet } from '../validations/tweet'

const _ = require('lodash')
const winston = require('winston')
const asyncHandler = require('express-async-handler')

// @desc    get all tweets
// @route   GET /api/tweets
// @access  Private
export const all = asyncHandler(async (req, res) => {
  const tweets = await Tweet.find()
  return res.status(200).json({ tweets })
})

// @desc    get a tweet
// @route   GET /api/tweets/:_id
// @access  Private
export const find = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params
    const tweet = await Tweet.findById(_id)
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' })
    }

    return res.status(200).json({ tweet })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

// @desc    POST a tweet
// @route   POST /api/tweets/
// @access  Private
export const create = asyncHandler(async (req, res) => {
  try {
    const { error } = validateTweet(req.body)
    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }
    const tweet = new Tweet()
    tweet.content = req.body.content
    tweet.author = req.user
    await tweet.save()
    return res.status(201).json({ tweet })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

// @desc    Update a tweet
// @route   PUT /api/tweets/:_id
// @access  Private
export const update = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params
    const tweet = await Tweet.findOne({ _id, author: req.user })
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' })
    }

    const { error } = validateTweet(req.body)

    if (error) {
      return res.status(400).json({ message: error.details[0].message })
    }

    tweet.content = req.body.content
    await tweet.save()
    return res.status(200).json({ tweet })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})

// @desc    Remove a tweet
// @route   DELETE /api/tweets/:_id
// @access  Private
export const remove = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params
    const tweet = await Tweet.findOneAndDelete({ _id, author: req.user })
    if (!tweet) {
      return res.status(404).json({ error: 'Tweet not found' })
    }

    return res.status(204).json({ tweet: 'tweet deleted' })
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
})
