const express = require('express')
const app = express()



app.get('/', function (request, response) {
    response.send('Hello World from Express Server')
})

app.listen(3000,() =>{
    console.log(`express server app is running on the port 3000`)
})