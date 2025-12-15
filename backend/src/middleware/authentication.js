const jwt = require('jsonwebtoken');

//authenticate the user
const authUser = (req, res, next) => {
  //extraction
  //get the authentication header from the request
  //should contain a bearer token
  const authHeader = req.headers.authorization;

  //check if the header exist
  // if not , user didn't send a bearer token - they're not authorized
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required. No token provided',
    });
  }

  //check if the format of the authentication header is correct
  if (!authHeader.startsWith('Bearer')) {
    return res.status(401).json({
      success: false,
      message: 'Invalid token format. Use: Bearer <token>',
    });
  }

  try {
    //the authentication header has two parts
    // the key which is bearer token and value which is token created when the user logins
    //we split to get the token value
    const token = authHeader.split(" ")[1];

    //check if the encrypted token exist
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Token is missing.',
      });
    }

  
    //now we verify the token value using jwt.verify
    //check if token was signed with our secret
    //check if token hasn't expired
    //return the decoded payload
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    //attach the decoded payload which contains user info to he req object
    //makes it avaliable to the contollers
    req.user = decoded.user || decoded;

    next();
  } catch (error) {
    //Errors thrown by jwt.verify

    //if token has expired
    if(error.name === 'TokenExpiredError') {
        return res.status(401).json({
            success: false,
            message: 'Token has expired. Please login again.'
        });
    }

    //if token format is malformed
    if(error.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false,
            message: 'Invalid token. Authentication failed.'
        });
    }

    //for any other errors that occur
    return res.status(401).json({
        success: false,
        message: 'Authentication failed. Please try again.'
    });
  }
};


module.exports = { authUser }