const TAG = '[ADD-FORMER-MEMBER-V1]';
const Logger = require('../services/logger')
const formerMemberModel = require('../models/formerMemberModel')
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();


//add Former member
exports.post =  async(request, response) => {
    var ACTION ='[ADD-FORMER-MEMBER]'

    if (!request.file) {
    return response.status(400).json({ error: 'No image uploaded' });
    }

      try {
        const { filename } = request.file; // Get image data from multer
        const {name, info, title, dateEnded} = request.body
        const newFormerMember = new formerMemberModel({
          name: name,
          info: info,
          title:title,
          dateEnded:dateEnded,
          filename: filename
        });
        await newFormerMember.save();
            Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully Add Former member!"});
            return response.status(201).json({message:"Successfully Add Former member!",})
      } catch (error) {
         Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({ error: 'Failed to Add Former member!' });
      }

};

exports.delete = async (request, response) => {
    var ACTION ='[DELETE-FORMER-MEMBER]'
    try {
        const {id} = request.params
        const user = await formerMemberModel.findByIdAndDelete(id, request.body)
        if(!user){
            Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No Data found on user with id: " + id});
            return response.status(404).json({message:"No Data found on user with id: " + id})
        }
        // const updatedUser = await User.findById(id)
        response.status(200).json({message: "Former Member successfully Deleted!"})
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({message:error.message})
    }
};

exports.get =  async(request, response) => {
    var ACTION ='[GET-ALL-FORMER-MEMBER]'

    try {
      const formerMembersData = await formerMemberModel.find({});
      if (!formerMembersData) {
        return response.status(404).json({ error: 'No Data Found!' });
      }
       Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully retrieve Former Members"});
      return response.status(200).json({formerMembersData})
    } catch (error) {
      Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {error: error.response.data});
      respose.status(500).json({ error: 'Failed to fetch Former Member Data' });
    }

};

exports.put = async (request, response) => {
    var ACTION ='[UPDATE-FORMER-MEMBER]'
    try {
        const {id} = request.params
        const formerMember = await formerMemberModel.findByIdAndUpdate(id, request.body)
        if(!formerMember){
            Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No Data found on user with id: " + id});
            return response.status(404).json({message:"No Data found on user with id: " + id})
        }
        const updatedFormerMember = await formerMemberModel.findById(id)
        Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully update FORMER Member data!"});
        response.status(200).json(updatedFormerMember)
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({message:error.message})
    }
}

