const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const officialMemberSchema = new Schema({
  name: String,
  info: String,
  title: String,
  filename: String,
  dateCreated: { type: Date, default: Date.now }
});

const OfficialMembers = mongoose.model('OfficialMembers', officialMemberSchema);

module.exports = OfficialMembers