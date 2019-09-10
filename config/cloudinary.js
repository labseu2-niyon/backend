const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const secret = require('./secret');

cloudinary.config({
  cloud_name: secret.cloudinaryName,
  api_key: secret.cloudinaryApiKey,
  api_secret: secret.cloudinaryApiSecret
});

const err = new Error('image type must be png or jpg');
const storage = cloudinaryStorage({
  cloudinary,
  folder: 'niyon-app',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 300, height: 300, crop: 'scale' }],
  filename(req, file, cb) {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true);
    } else {
      cb(err.message, false);
    }
  }
});
module.exports = storage;
