const express = require('express')
const mongoose = require('mongoose');
const User = require('./models/userModel')

const app = express()
//middleware so that the app can understand json
app.use(express.json())

app.listen(3000,() =>{
    console.log(`express server app is running on port 3000`)
})

//setup database
mongoose.connect('mongodb+srv://admin:NewPa$$w0rd@cluster0.czegh.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Server: Successfully Connected to Database'))
  .catch((error) =>{
    console.log(error) 
  });


//routes
app.get('/users', async function (request, response) {
  try {
    const user = await User.find({})
    response.status(200).json(user)
  } catch (error) {
    console.log(error.message)
    response.status(500).json({message:error.message})
  }
})

app.get('/user/:id', async function (request, response) {
  try {
    const {id} = request.params
    const user = await User.findById(id)
    response.status(200).json(user)
  } catch (error) {
    console.log(error.message)
    response.status(500).json({message:error.message})
  }
})


app.post('/user', async(request, response) =>{
  try {
      const user = await User.create(request.body)
      response.status(200).json(user)
  } catch (error) {
    console.log(error.message)
    response.status(500).json({message:error.message})
  }
})

app.put('/user/:id', async(request, response) => {
  
  try {
      const {id} = request.params
      const user = await User.findByIdAndUpdate(id, request.body)
      if(!user){
        return response.status(404).json({message:"No Data found on user with id: " + id})
      }
      const updatedUser = await User.findById(id)
      response.status(200).json(updatedUser)
  } catch (error) {
    response.status(500).jason({message:error.message})
  }
})

app.delete('/user/:id', async(request, response) => {
  
  try {
      const {id} = request.params
      const user = await User.findByIdAndDelete(id, request.body)
      if(!user){
        return response.status(404).json({message:"No Data found on user with id: " + id})
      }
      // const updatedUser = await User.findById(id)
      response.status(200).json({message: "date successfully Deleted!"})
  } catch (error) {
    response.status(500).jason({message:error.message})
  }
})