const express = require('express')
const router = express.Router();
const authenticate = require('../middlewares/authenticationMiddleware.js');
const SessionsController = require('../controllers/sessionsController.js');

router.post('/token',SessionsController.token)


module.exports = router