const multer = require('multer');
const dotenv = require('dotenv');

const path = require('path');
const fs = require('fs');

//============================================================//  init multer

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/gif'
    ) {
      cb(null, path.join(__dirname, '../public/userphoto'));
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

//======================================================// multer function

const userMulter = multer({
  storage: storage,
}).single('photo');

//=====================================================//  export email function
module.exports = {
  userMulter,
};
