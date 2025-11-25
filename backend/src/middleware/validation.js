const { registerUser} = require('../controllers/userController');

const validateCreateUser = ( req, res, next) => {
    const { username, email, password} = req.body;

    if(!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required'
        });
    }

    if (password.length < 8) {
        return res.status(400).json({
            success: false,
            message: 'Password must be atleast 8 characters'
        });
    }

    next();
};



module.exports = { validateCreateUser};