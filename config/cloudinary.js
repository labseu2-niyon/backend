const cloudinary = require('cloudinary');
const secret = require('./secret');

module.exports = cloudinary.config({
  cloud_name: secret.cloudinaryName,
  api_key: secret.cloudinaryApiKey,
  api_secret: secret.cloudinaryApiSecret
});
