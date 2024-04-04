const express = require('express')
const router = express.Router();
const SessionsController = require('../controllers/sessionsController.js');

router.post('/token',SessionsController.token)


module.exports = router