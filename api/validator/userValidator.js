const Validator = require('validatorjs');
const response = require('../helpers/response');
const userQuery = require('../helpers/users');
const models = require('../../database/models');

module.exports = {
  async validateUserExists(req, res, next) {
    const { username } = req.params;
    try {
      const user = await userQuery.findUserByUsername(username);
      if (!user) return response.error(res, 404, 'User not found');
      req.user = user;
      return next();
    } catch (errors) {
      return next({ message: 'Server error try again' });
    }
  },
  async validateUserEmail(req, res, next) {
    const { email } = req.body;
    try {
      const user = await models.Users.findOne({
        where: { email },
        attributes: ['email']
      });
      if (!user) {
        return response.error(res, 404, 'User not found');
      }
      req.userEmail = user;
      return next();
    } catch (error) {
      return next({ message: 'Server error try again' });
    }
  },

  validatePassword(req, res, next) {
    const { body } = req;
    const validator = new Validator(body, {
      password: 'required|min:5'
    });
    if (validator.fails) {
      return response.error(res, 400, 'Password must be at least 5 characters');
    }
    return next();
  }
};
