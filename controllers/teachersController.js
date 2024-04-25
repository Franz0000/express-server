const TAG = '[ADD-TEACHER-MEMBER-V1]';
const Logger = require('../services/logger')
const teachersModel = require('../models/teacherMemberModel')
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();


//add Teacher member
exports.post =  async(request, response) => {
    var ACTION ='[ADD-TEACHER-MEMBER]'

    if (!request.file) {
    return response.status(400).json({ error: 'No image uploaded' });
    }

      try {
        const { filename } = request.file; // Get image data from multer
        const {name, info, title, dateEnded} = request.body
        const newTeachers = new teachersModel({
          name: name,
          info: info,
          title:title,
          dateEnded:dateEnded,
          filename: filename
        });
        await newTeachers.save();
            Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully Add Former member!"});
            return response.status(201).json({message:"Successfully Add Former member!",})
      } catch (error) {
         Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({ error: 'Failed to Add Former member!' });
      }

};

exports.delete = async (request, response) => {
    var ACTION ='[DELETE-TEACHER-MEMBER]'
    try {
        const {id} = request.params
        const teachers = await teachersModel.findByIdAndDelete(id, request.body)
        if(!teachers){
            Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No Data found on user with id: " + id});
            return response.status(404).json({message:"No Data found on user with id: " + id})
        }
        // const updatedUser = await User.findById(id)
        response.status(200).json({message: "Teacher Member successfully Deleted!"})
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({message:error.message})
    }
};

exports.get =  async(request, response) => {
    var ACTION ='[GET-ALL-TEACHER-MEMBER]'

    try {
      const teachersData = await teachersModel.find({});
      if (!teachersData) {
        return response.status(404).json({ error: 'No Data Found!' });
      }
       Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully retrieve Teacher Members"});
      return response.status(200).json({teachersData})
    } catch (error) {
      Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {error: error.response.data});
      respose.status(500).json({ error: 'Failed to fetch Former Member Data' });
    }

};

exports.put = async (request, response) => {
    var ACTION ='[UPDATE-TEACHER-MEMBER]'
    try {
        const {id} = request.params
        const teachers = await teachersModel.findByIdAndUpdate(id, request.body)
        if(!teachers){
            Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No Data found on user with id: " + id});
            return response.status(404).json({message:"No Data found on user with id: " + id})
        }
        const updatedTeachersr = await teachersModel.findById(id)
        Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully update Teacher Member data!"});
        response.status(200).json(updatedTeachersr)
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({message:error.message})
    }
}

