const multer = require('multer');
const { ExternalServiceError } = require('../utils/customErrors')


const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if(file.mimetype.startsWith('image/')) {
      cb(null, true)
    } else {
      cb(new ExternalServiceError('Only image files allowed'));
    }
  }

});

console.log(upload.file);


module.exports =  { upload }