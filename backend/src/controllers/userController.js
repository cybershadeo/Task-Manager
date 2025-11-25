const asyncHandler = require('express-async-handler');
const { createUser} = require('../services/userService')



//register a user
//@route POST /api/user/signup
//@access public
const registerUser = asyncHandler(async (req, res) => {
    //gets the user input
    const { username, email, password} = req.body;

    //pass the input to the service for logic implementation
    const newUser = await createUser( username, email, password);

    //returns json to user
    res.status(201).json({
        success: true,
        user: newUser
    });
});


//login a user
//@route POST /api/user/signin
//@access public
const loginUser = asyncHandler(async (req,res) => {
    res.json({
        message: 'user signed in',
        statuscode: 200
    })
})

module.exports = { registerUser, loginUser }