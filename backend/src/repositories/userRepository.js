const prisma = require('../config/prisma');

//checking in my DB if the user exist
const findUserByUsername = async ( username ) => {
    return await prisma.user.findUnique({
        where: { username }
    });
};


//storing my user in the DB
const storeCreatedUser = async (userData) => {
    return await prisma.user.create({ data:userData });
};


const findUserById = async ( userId ) => {
    return await prisma.user.findUnique({
        where: { id: userId}
    });
}


module.exports = { findUserByUsername, storeCreatedUser, findUserById }