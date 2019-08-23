const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getAllMentors(req, res) {
    try {
      const mentors = await models.Mentors.findAll();
      if (mentors) {
        return response.success(res, 200, mentors);
      }
      return response.error(res, 404, 'Could not find all Mentors');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async createMentor(req, res) {
    try {
      const mentor = await models.Mentors.create(req.body);
      if (mentor) {
        return response.success(res, 200, mentor);
      }
      return response.error(res, 404, 'Could not create Mentor');
    } catch (error) {
      return response.success(res, 500, error.message);
    }
  }
};
