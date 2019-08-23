const models = require('../../database/models');

module.exports = {
  async getAllMentors(req, res) {
    try {
      const mentors = await models.Mentors.findAll({
        include: [
          {
            model: models.User,
            as: 'user'
          },
          {
            model: models.Locations,
            as: 'location'
          },
          {
            model: models.Industries,
            as: 'industry'
          }
        ]
      });
      return res.status(200).json({ mentors });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  },

  async createMentor(req, res) {
    try {
      const mentor = await models.Mentors.create(req.body);
      return res.status(201).json({ mentor });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  }
};
