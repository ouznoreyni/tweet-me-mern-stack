const express = require('express')
const {
  all,
  find,
  create,
  update,
  remove,
  findTweetFollowedUser,
} = require('../controllers/tweets')
const router = express.Router()

router.route('/').get(all).post(create)
router.get('/followings', findTweetFollowedUser)
router.route('/:_id').get(find).put(update).delete(remove)

module.exports = router
