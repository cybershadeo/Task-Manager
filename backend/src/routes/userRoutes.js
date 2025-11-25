const express = require('express');
const { registerUser, loginUser} = require('../controllers/userController');
const { validateCreateUser} = require('../middleware/validation');


const router = express.Router();

router.post('/signup', validateCreateUser, registerUser);


router.post('/signin', loginUser);


module.exports = router;