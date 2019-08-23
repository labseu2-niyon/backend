const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const secret = require('./secret');

cloudinary.config({
  cloud_name: secret.cloudinaryName,
  api_key: secret.cloudinaryApiKey,
  api_secret: secret.cloudinaryApiSecret
});

const err = new Error();
const storage = cloudinaryStorage({
  cloudinary,
  folder: 'niyon-app',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 300, height: 300, crop: 'limit' }],
  filename(req, file, cb) {
    console.log(file, err);
    cb(undefined, 'my-file-name');
  }
});

const parser = multer({ storage });

module.exports = parser;
