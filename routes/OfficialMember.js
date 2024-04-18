const express = require('express')
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadsMiddleware.js')
const OfficialMemberController = require('../controllers/officialMemberController.js');

router.post('/member',uploadMiddleware.upload(), OfficialMemberController.post)

router.get('/member',OfficialMemberController.get)

router.delete('/member/:id',OfficialMemberController.delete)

router.put('/member/:id',OfficialMemberController.put)

module.exports = router