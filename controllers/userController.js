const TAG = '[USER-MANAGEMENT-V1]';
const Logger = require('../services/logger')
const UserModel = require('../models/userModel')
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();

// const uuid = require('uuid')

exports.getUsers = async (request, response) => {
    var ACTION ='[GET-USERS]'
    try {
      const user = await UserModel.find({})
      Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully get users data!"});

      if(user.length <= 0){
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No data to retrieve yet!"});
        response.status(404).json(user)
      }
      response.status(200).json(user)
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {error: error});
        response.status(500).json({message:error.message})
    }
};

exports.getUser = async function (request, response) {
    var ACTION ='[GET-USER]'
    try {
        const {id} = request.params
        const user = await UserModel.findById(id)
        if(!user){
            Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No Data found on user with id: " + id});
            return response.status(404).json({message:"No Data found on user with id: " + id})
        }
        response.status(200).json(user)
    } catch (error) {
        console.log(error.message)
        response.status(500).json({message:error.message})
    }
}

exports.insertuser = async (request, response) =>{
    var ACTION ='[INSERT-USER]'
    request.body.clientId = generateRandomString()
    try {
        const user = await UserModel.create(request.body)
        Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully Save User data"});
        response.status(200).json({message:"Successfully Save User data",clientId: request.body.clientId})
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {error: error});
        response.status(500).json({message:error.message})
    }
}

exports.updateUser = async (request, response) => {
    var ACTION ='[UPDATE-USER]'
    try {
        const {id} = request.params
        const user = await UserModel.findByIdAndUpdate(id, request.body)
        if(!user){
            Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No Data found on user with id: " + id});
            return response.status(404).json({message:"No Data found on user with id: " + id})
        }
        const updatedUser = await UserModel.findById(id)
        Logger.log('info', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"Successfully update user data!"});
        response.status(200).json(updatedUser)
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({message:error.message})
    }
}

exports.deleteUser = async (request, response) => {
    var ACTION ='[DELETE-USER]'
    try {
        const {id} = request.params
        const user = await UserModel.findByIdAndDelete(id, request.body)
        if(!user){
            Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:"No Data found on user with id: " + id});
            return response.status(404).json({message:"No Data found on user with id: " + id})
        }
        // const updatedUser = await User.findById(id)
        response.status(200).json({message: "data successfully Deleted!"})
    } catch (error) {
        Logger.log('error', TAG + ACTION + '[REFID:' + uuid +'] response', {message:error.message});
        response.status(500).json({message:error.message})
    }
}

// Generate a random alphanumeric string
function generateRandomString() {
  const length = 30; // Set your desired length
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result +=characters.charAt(randomIndex);
  }
  return result.toUpperCase();
}