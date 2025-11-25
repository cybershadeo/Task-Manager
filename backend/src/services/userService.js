const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const { findUserByUsername, storeCreatedUser } = require('../repositories/userRepository');


//@Creates users
//@checks whether all the required fields are available
//@checks whether the user exists
//@Hashing the users password
async function createUser( username, email, password) {

    //checking if there is a user with such username
    const userAvailable = await findUserByUsername(username);
    if(userAvailable) {
        throw new Error('User already exist');
    }

    //hashing passwrod for security
    const hashedPassword = await bcrypt.hash(password);

    //passing the user data to be stored in the DB
    const user = await storeCreatedUser({
        username,
        email,
        password: hashedPassword,
    });

    
    if (user && user.id) {
        return {id: user.id, username: user.username}; 
    } else {
        throw new Error('Faild to create user');
    }


} 
     












module.exports = { createUser };