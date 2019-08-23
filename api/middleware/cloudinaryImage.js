const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');
const response = require('../helpers/response');
const cloudinaryConfig = require('../../config/cloudinary');

module.exports = {
  async deleteCloudImage(req, res, next) {
    if (req.user.public_id) {
      try {
        const deleteCloudImage = await cloudinary.uploader.destroy(
          req.user.public_id
        );
        req.deleteCloudImage = deleteCloudImage;
      } catch (error) {
        return response.error(error.message);
      }
    }
    return next();
  },

  uploadCloudImage(image) {
    const err = new Error('image type must be png or jpg');
    const storage = cloudinaryStorage({
      cloudinary: cloudinaryConfig,
      folder: 'niyon-app',
      allowedFormats: ['jpg', 'png'],
      transformation: [{ width: 300, height: 300, crop: 'limit' }],
      filename(req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
          cb(null, true);
        } else {
          cb(err.message, false);
        }
      }
    });
    const parser = multer({ storage });
    return parser.single(image);
  }
};
