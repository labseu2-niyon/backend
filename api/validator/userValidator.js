const Validator = require('validatorjs');
const Sequelize = require('sequelize');
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
    const validator = new Validator(req.body, {
      email: 'required|email'
    });
    if (validator.fails()) {
      return response.error(res, 400, 'Input a valid email');
    }
    try {
      const user = await models.Users.findOne({
        where: { email },
        attributes: ['email', 'username', 'id']
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
    if (validator.fails()) {
      return response.error(res, 400, 'Password must be at least 5 characters');
    }
    return next();
  },

  validateUserProfileUpdate(req, res, next) {
    const validator = new Validator(req.body, {
      firstName: 'required|alpha',
      lastName: 'required|alpha'
    });
    if (validator.fails()) {
      return response.error(res, 400, validator.errors.all());
    }
    return next();
  },

  validateLocationInfo(req, res, next) {
    const validator = new Validator(req.body, {
      countryName: 'required',
      cityName: 'required'
    });
    if (validator.fails()) {
      return response.error(res, 400, validator.errors.all());
    }
    return next();
  },

  async validateUserSignup(req, res, next) {
    const validator = new Validator(req.body, {
      username: 'required|alpha_num',
      password: 'required|min:8',
      email: 'required|email'
    });

    if (validator.fails()) {
      return response.error(res, 400, validator.errors.all());
    }
    try {
      const user = await models.Users.findOne({
        where: {
          [Sequelize.Op.or]: [
            { email: req.body.email },
            { username: req.body.username }
          ]
        },
        attributes: ['id']
      });
      if (!user) {
        return next();
      }
      return response.error(
        res,
        400,
        'User already registered with username or email provided'
      );
    } catch (error) {
      return next({ message: 'Error validating user signup' });
    }
  }
};
