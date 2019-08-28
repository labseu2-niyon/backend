const response = require('../helpers/response');
const userQuery = require('../helpers/users');

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
  }
};
