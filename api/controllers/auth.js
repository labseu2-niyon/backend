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
      if (user.dataValues.first_name)
        res.redirect(`${keys.FRONTEND_BASE_URL}/?token=${token}`);
      res.redirect(`${keys.FRONTEND_BASE_URL}/auth/social?token=${token}`);
      return response.success(res, 200, {
        message: `${user.dataValues.email} successfully logged in.`,
        token
      });
    } catch (error) {
      return next({ message: `${error.message}` });
    }
  }
};
