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
      console.log(errors.message);
      return next({ message: 'Server error try again' });
    }
  },
  async validateUserEmail(req, res, next) {
    const { email } = req.body;
    try {
      const user = await models.Users.findOne({ where: { email } });
      if (!user) {
        return response.error(res, 404, 'User not found');
      }
      req.userEmail = user;
      return next();
    } catch (error) {
      return next({ message: 'Server error try again' });
    }
  }
};
