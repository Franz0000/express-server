const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
  name: String,
  info: String,
  title: String,
  filename: String,
  dateCreated: { type: Date, default: Date.now }
});

const Teachers = mongoose.model('Teachers', teacherSchema);

module.exports = Teachers