const express = require('express')
const user = require('../controllers/user')
const { protect, admin } = require('../middleware/auth')
const { uploadFile } = require('../utils/upload')
const router = express.Router()

router
  .route('/profil')
  .get([protect], user.myProfil)
  .put([protect, uploadFile('users', 'avatar')], user.updateProfil)
router
  .route('/:_id')
  .get([protect], user.find)
  .delete([protect, admin], user.remove)
router.route('/').get([protect, admin], user.all)
router.put('/follow/:_id', [protect], user.follow)
router.put('/unfollow/:_id', [protect], user.unfollow)

module.exports = router
