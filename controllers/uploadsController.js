const TAG = '[UPLOAD-IMAGE-V1]';
const Logger = require('../services/logger')
const UploadImage = require('../models/uploadImageModel')
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();



exports.singleUpload =  async(request, response) => {
    var ACTION ='[UPLOAD]'

    if (!request.file) {
    return response.status(400).json({ error: 'No file uploaded' });
  }

      try {
        const { filename, path, mimetype, originalname } = request.file; // Get image data from multer
        const newImage = new UploadImage({
          filename: filename,
          originalname: originalname,
          mimetype: mimetype,
          path: path
        });

        await newImage.save();
            Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully upload Image"});
            return response.status(201).json({message:"Successfully upload files",})
      } catch (error) {
         Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({ error: 'Failed to upload image' });
      }

};

exports.multipleUpload =  async(request, response) => {
    var ACTION ='[UPLOAD-MULTIPLE-IMAGES]'

    if (!request.files || request.files.length === 0) {
    return response.status(400).json({ error: 'No file uploaded' });
    }

        try {
        // Save image metadata to MongoDB
        const images = request.files.map((file) => ({
          filename: file.filename,
          originalname: file.originalname,
          mimetype: file.mimetype,
          path: file.path,
        }));

        await UploadImage.insertMany(images);
        Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully upload file"});
        return response.status(201).json({message:"Successfully upload files"})
      } catch (error) {
        response.status(500).json({ error: 'Error uploading images' });
      }

};

exports.getSingleImage =  async(request, response) => {
    var ACTION ='[GET-SINGLE-IMAGE]'

    if (!request.params.id) {
    return response.status(400).json({ error: 'id is required for this action' });
    }

      try {
        const imageData = await UploadImage.findById(request.params.id);
        if (!imageData) {
          return response.status(404).json({ error: 'Image not found' });
        }

        const imagePath = path.join(__dirname, '../',imageData.path);

        response.sendFile(imagePath);
        Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully retrieve Image"});
        // return response.status(200).json(imageData)
      } catch (error) {
        console.error('Error fetching image:', error);
        response.status(500).json({ error: 'Failed to fetch image' });
      }

};

exports.getAllImage =  async(request, response) => {
    var ACTION ='[GET-ALL-IMAGES]'

  try {
    const imageData = await UploadImage.find({});
    if (!imageData) {
      return response.status(404).json({ error: 'Image not found' });
    }
     Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully retrieve Image"});
    return response.status(200).json({imageData})
  } catch (error) {
    console.error('Error fetching image:', error);
    respose.status(500).json({ error: 'Failed to fetch images' });
  }

};

