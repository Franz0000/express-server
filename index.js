const express = require('express')
const mongoose = require('mongoose');
const Logger = require('./services/logger')
const userRoutes = require('./routes/Users');
const uploadRoutes = require('./routes/Uploads');
const sessionRoutes = require('./routes/sessions');

require('dotenv').config()

const app = express()
//middleware so that the app can understand json
app.use(express.json())
app.use(express.static('public'));


let port = process.env.PORT || 8080;
app.listen(port,() =>{
  // Logger.log('debug', TAG + ACTION + ' request body', req.body);
  Logger.log('debug', '[App] Now up and running', {port: port})
})

//setup database
mongoose.connect(`mongodb+srv://admin:NewPa$$w0rd@cluster0.czegh.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => Logger.log('debug', '[DBCONNECTION]',{message:'Database Connected!'}))
  .catch((error) =>{
    Logger.log('error', '[DBCONNECTION]', {error: error})
  });


//routes
app.use('/users', userRoutes);
app.use('/uploads', uploadRoutes);
app.use('/sessions', sessionRoutes);