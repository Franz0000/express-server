const express = require('express')
const router = express.Router();
const SessionsController = require('../controllers/sessionsController.js');
// const AuthenticateController = require('../middlewares/authenticateMiddleware.js');

// router.post('/token',AuthenticateController.authenticate,SessionsController.token)

router.post('/token',SessionsController.token)


module.exports = router