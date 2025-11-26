const express = require('express');
const { registerUser, loginUser} = require('../controllers/userController');
const { validateCreateUser, validateExistingUser} = require('../middleware/validation');


const router = express.Router();

router.post('/signup', validateCreateUser, registerUser);


router.post('/signin', validateExistingUser, loginUser );



module.exports = router;