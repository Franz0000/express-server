const TAG = '[UPLOAD-IMAGE-V1]';
const Logger = require('../services/logger')
const UserModel = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();



exports.singleUpload =  (request, response) => {
    var ACTION ='[UPLOAD]'

    if (!request.file) {
    return response.status(400).json({ error: 'No file uploaded' });
  }
    Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully upload file"});
    return response.status(201).json({message:"Successfully upload files"})

};

exports.multipleUpload =  (request, response) => {
    var ACTION ='[UPLOAD]'

    if (!request.files || request.files.length === 0) {
    return response.status(400).json({ error: 'No file uploaded' });
  }
    Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully upload file"});
    return response.status(201).json({message:"Successfully upload files"})

};

