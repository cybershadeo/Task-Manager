const asyncHandler = require('express-async-handler');
const { createUser, existingUser, getUserData, DashboardService, updateUserProfile} = require('../services/userService')

const dashboardService = new DashboardService();

//register a user
//@route POST /api/user/signup
//@access public
const registerUser = asyncHandler(async (req, res) => {
    //gets the user input
    const { username, email, password, profilePicture} = req.body;

    //pass the input to the service for logic implementation
    const newUser = await createUser( username, email, password, profilePicture);

    //returns json response to user
    res.status(201).json({
        success: true,
        accessToken: newUser.accessToken,
        user: newUser.user
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
        accessToken: currentUser.accessToken,
        user: currentUser.user
    });
});


const getUserProfile = asyncHandler ( async (req,res) => {

    const userId = req.user && req.user.id;

    const currentUser = await getUserData(userId);

    res.status(200).json({
        success: true,
        data: currentUser
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


const updateProfile = asyncHandler (async (req, res) => {

    const userId = req.user && req.user.id;
    const file = req.file;
    const { username, email} = req.body;

   
    
    const updatedUser = await updateUserProfile(userId, {file, username, email});

    res.status(200).json({
        success: true,
        data: updatedUser
    });
});



module.exports = { registerUser, loginUser, getUserProfile, getUserMetrics, updateProfile }