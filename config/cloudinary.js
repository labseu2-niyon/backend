const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const secret = require('./secret');

cloudinary.config({
  cloud_name: secret.cloudinaryName,
  api_key: secret.cloudinaryApiKey,
  api_secret: secret.cloudinaryApiSecret
});

const storage = cloudinaryStorage({
  cloudinary,
  folder: 'niyon-app',
  allowedFormats: ['jpg', 'png'],
  transformation: [{ width: 300, height: 300, crop: 'fill' }]
});
module.exports = storage;
