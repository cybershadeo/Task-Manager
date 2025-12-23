const express = require('express');
const { registerUser, loginUser, getUserProfile, getUserMetrics } = require('../controllers/userController');
const { validateCreateUser, validateExistingUser } = require('../middleware/validation');
const { authUser } = require('../middleware/authentication');


const router = express.Router();

router.post('/signup', validateCreateUser, registerUser);
router.post('/signin', validateExistingUser, loginUser );
router.get('/profile', authUser, getUserProfile );
router.get('/dashboard', authUser, getUserMetrics);

//Implement a user profile page 

/*
     Dashbord displayment
Implement a function in service layer that:
  1.displays total category count 
  2.displays total task count 
  3.displays total completed tasks/subtasks
  4.displays pended tasks
  5.displays task/subtask in progress
  6.categories with their task and nested subtask counts
*/  


module.exports = router;