const express = require('express')
const router = express.Router();
const multer = require('multer')
const path = require('path')

// Set up Multer for handling file uploads
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images'); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});
const store = multer({ storage });

exports.upload = () => {
   return store.single('image')
}

exports.uploads = () => {
   return store.array('image', 10)
}
