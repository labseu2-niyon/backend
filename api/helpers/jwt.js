const jwt = require('jsonwebtoken');
const secret = require('../../config/secret');
const response = require('./response');

module.exports = {
  async generateToken(user) {
    const payload = {
      subject: user.id,
      username: user.username
    };

    const options = {
      expiresIn: '1d'
    };

    const token = await jwt.sign(payload, secret.jwtSecret, options);
    return token;
  },

  async authUser(req, res, next) {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
      return response.error(res, 401, 'Token is required');
    }
    try {
      const decode = await jwt.verify(token, secret.jwtSecret);
      req.decode = decode;
      return next();
    } catch (error) {
      return response.error(res, 401, 'Error token type');
    }
  }
};
