const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async validateUserExists(req, res, next) {
    const { username } = req.params;
    try {
      const user = await models.Users.findOne({
        where: { username }
      });
      if (!user) return response.error(res, 404, 'User not found');
      req.user = user;
      return next();
    } catch (errors) {
      return next({ message: 'Server error try again' });
    }
  }
};
