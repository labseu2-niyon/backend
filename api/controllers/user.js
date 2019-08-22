const models = require('../../database/models');

module.exports = {
  async getUserByUsername(req, res) {
    try {
      const { userName } = req.query;
      const user = await models.Users.findOne({
        where: { username: userName },
        include: [
          {
            model: models.Locations,
            as: 'location'
          }
        ]
      });
      if (user) {
        return res.status(200).json({ user });
      }
      return res.status(404).send('User with that username does not exist');
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await models.Users.findAll({
        include: [
          {
            model: models.Locations,
            as: 'location'
          }
        ]
      });
      return res.status(201).json({ users });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};
