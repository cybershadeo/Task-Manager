const { ValidationError } = require("../utils/customErrors");

// validating the user input for signing up
const validateCreateUser = ( req, res, next) => {
    const { username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Wrong email format'
        })
    }
    
    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: 'Password must be atleast 8 characters'
        });
    }

    next();
};


//validating the user input for signing in
const validateExistingUser = ( req, res , next ) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    next();
} 



module.exports = { validateCreateUser, validateExistingUser };