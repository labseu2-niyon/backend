const models = require('../../database/models');

module.exports = {
  async findUserByUsername(username) {
    try {
      const user = await models.Users.findOne({
        where: { username }
      });
      return user;
    } catch (error) {
      return error.message;
    }
  }
};
