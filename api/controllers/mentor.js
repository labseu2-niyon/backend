/* eslint-disable no-dupe-keys */
const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getAllMentors(req, res) {
    try {
      const mentors = await models.Mentors.findAll({
        attributes: ['user_id', 'industry_id', 'location_id'],
        include: [
          {
            model: models.Industries,
            attributes: ['industry_name'],
            as: 'industry'
          },
          {
            model: models.Users,
            attributes: [
              'first_name',
              'last_name',
              'biography',
              'profile_picture'
            ],
            as: 'user',
            required: true,
            include: [
              {
                model: models.Locations,
                attributes: ['country_name', 'city_name'],
                as: 'location'
              }
            ]
          }
        ]
      });
      return response.success(res, 200, mentors);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async makeUserMentor(req, res) {
    try {
      const { locationId, industryId } = req.body;
      const userId = req.user.id;
      const mentor = await models.Mentors.create({
        user_id: userId,
        location_id: locationId,
        industry_id: industryId
      });
      return response.success(res, 201, mentor);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async checkIfUserIsMentor(req, res) {
    try {
      const userId = req.user.id;
      await models.Mentors.findOne({
        where: { user_id: userId },
        attributes: ['id', 'location_id', 'industry_id']
      });
      const newMentor = { mentor: true };
      return response.success(res, 200, newMentor);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async addMentorChoice(req, res) {
    try {
      const { mentorTypeId, mentorId } = req.body;
      const mentorChoice = await models.Mentors_choices.create({
        mentoring_type_id: mentorTypeId,
        mentor_id: mentorId
      });
      return response.success(res, 201, mentorChoice);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  }
};
