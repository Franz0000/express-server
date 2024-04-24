const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const formerMemberSchema = new Schema({
  name: String,
  info: String,
  title: String,
  filename: String,
  dateEnded: String,
  dateCreated: { type: Date, default: Date.now }
});

const FormerMembers = mongoose.model('FormerMembers', formerMemberSchema);

module.exports = FormerMembers