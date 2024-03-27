const express = require('express')
const router = express.Router();

const UserController = require('../controllers/userController.js');

router.get('/', UserController.getUsers)
  
router.get('/:id', UserController.getUser)
  
router.post('/', UserController.insertuser)
  
router.put('/:id', UserController.updateUser)
  
router.delete('/:id',UserController.deleteUser)


module.exports = router