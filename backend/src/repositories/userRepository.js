const prisma = require('../config/prisma')

console.log('Prisma:', prisma);  // ← Add this line
console.log('Prisma user model:', prisma?.user);

const findUserByUsername = async ( username ) => {
    return await prisma.user.findUnique({
        where: { username }
    });
};

const storeCreatedUser = async (userData) => {
    return await prisma.user.create({ data:userData });
};


module.exports = { findUserByUsername, storeCreatedUser }