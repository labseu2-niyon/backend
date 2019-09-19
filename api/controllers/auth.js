// const bcrypt = require('bcryptjs');
// const models = require('../../database/models');
const response = require('../helpers/response');
const jwt = require('../helpers/jwt');
const keys = require('../../config/secret');

module.exports = {
  async socialAuthlogin(req, res, next) {
    const { user } = req;

    try {
      const token = await jwt.generateToken(user.dataValues);
      console.log(req.headers.host);
      res.redirect(`${keys.REDIRECT_URL}?token=${token}`);
      return response.success(res, 200, {
        message: `${user.dataValues.email} successfully logged in.`,
        token
      });
    } catch (error) {
      return next({ message: `${error.message}` });
    }
  }
};
