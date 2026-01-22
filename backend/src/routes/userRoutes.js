const express = require('express');
const { registerUser, loginUser, getUserProfile, getUserMetrics, updateProfile } = require('../controllers/userController');
const { validateCreateUser, validateExistingUser } = require('../middleware/validation');
const { authUser } = require('../middleware/authentication');
const { upload } = require('../middleware/fileUpload')


const router = express.Router();

router.post('/signup', validateCreateUser, registerUser);
router.post('/signin', validateExistingUser, loginUser );
router.get('/profile', authUser, getUserProfile );
router.get('/dashboard', authUser, getUserMetrics);
router.put('/profile/:userId', authUser, upload.single('avatar'), updateProfile);



module.exports = router;