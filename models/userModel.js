const mongoose  = require("mongoose");

const userSchema =  mongoose.Schema({
    firstName:{type:String,required:[true,"first name is required for this action."]},
    middleName:{type:String,required:[true,"middle name is required for this action."]},
    lastName:{type:String,required:[true,"last name is required for this action."]},
    address:{type:String,required:[true, "address is required for this action"]},
    gender:{type:String,required:[true, "gender is required for this action"]},
    email:{type:String,required:[true, "email is required for this action"]},
    userName:{type:String,required:[true, "userName is required for this action"]},
    password:{type:String,required:[true, "password is required for this action"]},
    clientId:{type:String,required:[true, "clientId is required for this action"]},
},{timeStamps:true});


const User = mongoose.model('User', userSchema);

module.exports = User