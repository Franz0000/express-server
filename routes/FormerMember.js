const express = require('express')
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadsMiddleware.js')
const FormerMemberController = require('../controllers/formerMemberController.js');

router.post('/member',uploadMiddleware.upload(), FormerMemberController.post)

router.get('/member',FormerMemberController.get)

router.delete('/member/:id',FormerMemberController.delete)

router.put('/member/:id',FormerMemberController.put)

module.exports = router