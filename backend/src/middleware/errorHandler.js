
const { AppError} = require('../utils/customErrors');

const errorHandler = (err, req, res, next) => {
  if (!(err instanceof AppError)) {
    console.error(err);
    return res.status(500).json({
      success: false,
      error: "Internal Server Error"
    });
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message
  });
};

module.exports = errorHandler;


