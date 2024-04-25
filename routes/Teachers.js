const express = require('express')
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadsMiddleware.js')
const TeachersController = require('../controllers/teachersController.js');

router.post('/member',uploadMiddleware.upload(), TeachersController.post)

router.get('/member',TeachersController.get)

router.delete('/member/:id',TeachersController.delete)

router.put('/member/:id',TeachersController.put)

module.exports = router