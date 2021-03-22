const express = require('express')
const { all, find, create, update, remove } = require('../controllers/tweets')
const router = express.Router()

router.route('/').get(all).post(create)

router.route('/:_id').get(find).put(update).delete(remove)

module.exports = router
