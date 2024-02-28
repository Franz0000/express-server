const express = require('express')
const mongoose = require('mongoose');

const app = express()

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
app.get('/', function (request, response) {
    response.send('Hello World from Express Server')
})
app.get('/blog', function (request, response) {
    response.send('hello blog')
})