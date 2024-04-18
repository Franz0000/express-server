const TAG = '[ADD-OFFICIAL-MEMBER-V1]';
const Logger = require('../services/logger')
const OfficialMembersModel = require('../models/officialMemberModel')
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();


//add official member
exports.post =  async(request, response) => {
    var ACTION ='[ADD-OFFICIAL-MEMBER]'

    if (!request.file) {
    return response.status(400).json({ error: 'No image uploaded' });
    }

      try {
        const { filename } = request.file; // Get image data from multer
        const {name, info, title} = request.body
        const newOfficialMember = new OfficialMembersModel({
          name: name,
          info: info,
          title:title,
          filename: filename,
        });
        await newOfficialMember.save();
            Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully Add official member!"});
            return response.status(201).json({message:"Successfully Add official member!",})
      } catch (error) {
         Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({ error: 'Failed to Add official member!' });
      }

};

// exports.multipleUpload =  async(request, response) => {
//     var ACTION ='[UPLOAD-MULTIPLE-IMAGES]'

//     if (!request.files || request.files.length === 0) {
//     return response.status(400).json({ error: 'No file uploaded' });
//     }

//         try {
//         // Save image metadata to MongoDB
//         const images = request.files.map((file) => ({
//           filename: file.filename,
//           originalname: file.originalname,
//           mimetype: file.mimetype,
//           path: file.path,
//         }));

//         await UploadImage.insertMany(images);
//         Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully upload file"});
//         return response.status(201).json({message:"Successfully upload files"})
//       } catch (error) {
//         response.status(500).json({ error: 'Error uploading images' });
//       }

// };

// exports.getSingleImage =  async(request, response) => {
//     var ACTION ='[GET-SINGLE-IMAGE]'

//     if (!request.params.id) {
//     return response.status(400).json({ error: 'id is required for this action' });
//     }

//       try {
//         const imageData = await UploadImage.findById(request.params.id);
//         if (!imageData) {
//           return response.status(404).json({ error: 'Image not found' });
//         }

//         const imagePath = path.join(__dirname, '../',imageData.path);

//         response.sendFile(imagePath);
//         Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully retrieve Image"});
//         // return response.status(200).json(imageData)
//       } catch (error) {
//         console.error('Error fetching image:', error);
//         response.status(500).json({ error: 'Failed to fetch image' });
//       }

// };

exports.delete = async (request, response) => {
    var ACTION ='[DELETE-OFFICIAL-MEMBER]'
    try {
        const {id} = request.params
        const user = await OfficialMembersModel.findByIdAndDelete(id, request.body)
        if(!user){
            Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No Data found on user with id: " + id});
            return response.status(404).json({message:"No Data found on user with id: " + id})
        }
        // const updatedUser = await User.findById(id)
        response.status(200).json({message: "Member successfully Deleted!"})
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({message:error.message})
    }
};

exports.get =  async(request, response) => {
    var ACTION ='[GET-ALL-OFFICIAL-MEMBER]'

    try {
      const officialMembersData = await OfficialMembersModel.find({});
      if (!officialMembersData) {
        return response.status(404).json({ error: 'No Data Found!' });
      }
       Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully retrieve Official Members"});
      return response.status(200).json({officialMembersData})
    } catch (error) {
      Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {error: error.response.data});
      respose.status(500).json({ error: 'Failed to fetch official Member Data' });
    }

};

exports.put = async (request, response) => {
    var ACTION ='[UPDATE-OFFICIAL-MEMBER]'
    try {
        const {id} = request.params
        const officialMember = await OfficialMembersModel.findByIdAndUpdate(id, request.body)
        if(!officialMember){
            Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No Data found on user with id: " + id});
            return response.status(404).json({message:"No Data found on user with id: " + id})
        }
        const updatedOfficialMember = await OfficialMembersModel.findById(id)
        Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully update Official Member data!"});
        response.status(200).json(updatedOfficialMember)
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({message:error.message})
    }
}

