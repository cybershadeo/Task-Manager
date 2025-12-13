const path = require("path");

//moving 2 dir up to find the .env file
require("dotenv").config({ path: path.join(__dirname, "../../.env") });


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { findUserByUsername, storeCreatedUser } = require('../repositories/userRepository');
const { isEmailValid } = require('../utils/externalApis')
const { ValidationError, ExternalServiceError, ConflictError } = require('../utils/customErrors')


//@Creates users
//@checks whether the user exists
//@Hashing the users password
async function createUser( username, email, password) {



    const emailCheck = await isEmailValid(email)
    if(!emailCheck.valid) {
        if(emailCheck.isServiceError) {
            throw new ExternalServiceError(emailCheck.reason);
        } else {
            throw new ValidationError(emailCheck.reason);
        }
    }

    //checking if there is a user with such username
    const userAvailable = await findUserByUsername(username);
    if(userAvailable) {
        throw new ConflictError('Username already taken');
    }

    saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    //hashing passwrod for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //passing the user data to be stored in the DB
    const user = await storeCreatedUser({
        username,
        email,
        password: hashedPassword,
    });

    
    return {
        id: user.id,
        username: user.username,
    };
} 
   

//@login user
//check wether user exist
//@use jwt to keep user logged in
async function existingUser( username, password) {
  
    //storing the info of the user from DB
    const user = await findUserByUsername(username);

    //compare the hashedPassword & input Password
    if(user && await(bcrypt.compare(password, user.password))) {
        //creating a jwt accessToken that keeps the user signed in
        //jwt contains the time in which it expires
        const accessToken = jwt.sign(
            {
                user: {
                    id: user.id,
                    username: user.username, 
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '20m'}
        );
        return accessToken;
    } else {
        throw new ValidationError('Username or password is invalid');
    }
}


module.exports = { createUser, existingUser };