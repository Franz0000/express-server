const TAG = '[SESSSIONS-V1]';
const Logger = require('../services/logger')
const { v4: uuidv4 } = require('uuid');
const uuid = uuidv4();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require("axios");
var secretKey = "EXTERNAL-API"
exports.token =  async(request, response) => {
    var ACTION ='[TOKEN]'

    // Authenticate user (e.g., check credentials against a database)
    const { username, password ,clientId} = request.body;
    // ... (fetch user from database and verify password)
		var options = {
			method: 'GET',
			url:process.env.SERVER_URL+":"+process.env.SERVER_PORT+"/users/",
			headers: {
				'accept': 'application/json',
				'content-type': 'application/json'
			}
		}
		axios(options).then((resp) => {
            const id = resp.data.find((obj) => {
                return obj.clientId === clientId
            })

            if(id){
                // Generate a JWT token
                const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
                Logger.log('info', TAG + ACTION + '[REFID:' + uuid + '] response', {message:"Successfully Authenticate Client"});
                response.status(201).json({ token });
            }else{
                Logger.log('error', TAG + ACTION + '[ERROR][REFID:' + uuid + '] response', {message:"invalid Credential."});
                return response.status(500).json({message:"invalid Credential."});           
            }

        }).catch((error) => {
            Logger.log('error', TAG + ACTION + '[ERROR][REFID:' + uuid + '] response', error.response.data);
			return response.status(500).json(error.response.data);

        });




};


