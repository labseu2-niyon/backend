const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getAllMentors(req, res) {
    try {
      const mentors = await models.Mentors.findAll({
        include: [
          {
            model: models.Users,
            as: 'user',
            required: true
          }
        ]
      });
      console.log(mentors, 'hello');
      if (mentors) {
        return response.success(res, 200, mentors);
      }
      return response.error(res, 404, 'Could not find all Mentors');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async makeUserMentor(req, res) {
    try {
      const { userName } = req.params;
      const userId = await models.Users.findOne({
        attributes: ['id'],
        where: { username: userName }
      });
      if (userId) {
        const mentor = await models.Mentors.create({
          user_id: userId,
          ...req.body
        });
        if (mentor) {
          return response.success(res, 200, mentor);
        }
        return response.error(res, 404, 'Could not create Mentor');
      }
      return response.error(res, 404, `user ${userName} does not exist`);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  }
};
