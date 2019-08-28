const models = require('../../database/models');
const response = require('../helpers/response');
const bcrypt = require('bcrypt');

module.exports = {
  async getUserByUsername(req, res) {
    try {
      const { userName } = req.query;
      const user = await models.Users.findOne({
        where: { username: userName }
      });
      if (user) {
        return response.success(res, 201, user);
      }
      return response.error(res, 404, 'User with that username does not exist');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await models.Users.findAll();
      return response.success(res, 201, users);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async createUserProfile(req, res) {
    try {
      const user = await models.Users.create(req.body);
      if (user) {
        return response.success(
          res,
          201,
          `${user.username} account created successfully`
        );
      }
      return response.error(res, 404, 'Could not create Profile');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async createUser(req, res) {
    try {
      const user = await models.Users.create(req.body);
      if (user) {
        return response.success(
          res,
          201,
          `${user.username} account created successfully`
        );
      }
      return response.error(res, 400, 'Could not create Profile');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async loginUser(req, res) {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (user.password === hashedPassword) {
          return document(null, user)
    }
    return cb(null, user, { message: 'Logged In Successfully' });
  }
};
