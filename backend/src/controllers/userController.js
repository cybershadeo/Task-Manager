const asyncHandler = require('express-async-handler');
const { createUser, existingUser, getUserData, DashboardService} = require('../services/userService')

const dashboardService = new DashboardService();

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


const getUserProfile = asyncHandler ( async (req,res) => {

    const userId = req.user && req.user.id;

    const currentUser = await getUserData(userId);

    res.status(200).json({
        success: true,
        user: currentUser
    });
});


const getUserMetrics = asyncHandler (async (req, res) => {

    const userId = req.user && req.user.id;

    const userMetrics = await dashboardService.getDashboardStats(userId);

    res.status(200).json({
        success: true,
        data: userMetrics
    });
});

module.exports = { registerUser, loginUser, getUserProfile, getUserMetrics }