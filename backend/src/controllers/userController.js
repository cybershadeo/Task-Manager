const asyncHandler = require('express-async-handler');
const { createUser, existingUser} = require('../services/userService')



//register a user
//@route POST /api/user/signup
//@access public
const registerUser = asyncHandler(async (req, res) => {
    //gets the user input
    const { username, email, password} = req.body;

    //pass the input to the service for logic implementation
    const newUser = await createUser( username, email, password);

    //returns json response to user
    res.status(201).json({
        success: true,
        message: 'User created successfully',
        user: newUser
    });
});



//login a user
//@route POST /api/user/signin
//@access public
const loginUser = asyncHandler(async (req,res) => {
    //get the user input
    const { username, password } = req.body;

    //pass the data to the service for logic implemenation
    const currentUser = await existingUser( username, password );

    //return json response to user
    res.status(201).json({
        success: true,
        user: currentUser
    });
});

module.exports = { registerUser, loginUser }