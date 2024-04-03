const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const uploadImageSchema = new Schema({
  filename: String,
  originalname: String,
  mimetype: String,
  path: String,
  dateCreated: { type: Date, default: Date.now }
});

const UploadImage = mongoose.model('Images', uploadImageSchema);

module.exports = UploadImage