const express = require('express')
const router = express.Router();
const uploadMiddleware = require('../middlewares/uploadsMiddleware.js')
const UploadController = require('../controllers/uploadsController.js');

router.post('/single',uploadMiddleware.upload(), UploadController.singleUpload)
router.post('/multiple',uploadMiddleware.uploads(), UploadController.multipleUpload)
  



module.exports = router