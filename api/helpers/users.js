const models = require('../../database/models');

module.exports = {
  async findUserByUsername(username) {
    const user = await models.Users.findOne({
      where: { username }
    });
    return user;
  }
};
