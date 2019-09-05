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
      const { locationId, industryId } = req.body;
      const { username } = req.params;
      const user = await models.Users.findOne({
        attributes: ['id'],
        where: { username }
      });
      const userId = user.dataValues.id;
      if (userId) {
        const mentor = await models.Mentors.create({
          user_id: userId,
          location_id: locationId,
          industry_id: industryId
        });
        if (mentor) {
          return response.success(res, 201, mentor);
        }
        return response.error(res, 404, 'Could not create Mentor');
      }
      return response.error(res, 404, `user ${username} does not exist`);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async checkifUserIsMentor(req, res) {
    try {
      const { username } = req.params;
      const user = await models.Users.findOne({
        attributes: ['id'],
        where: { username }
      });
      if (user) {
        const userId = user.dataValues.id;
        const mentor = await models.Mentors.findOne({
          where: { user_id: userId },
          attributes: ['id', 'location_id', 'industry_id']
        });
        if (mentor) {
          const newMentor = { ...mentor.dataValues, mentor: true };
          return response.success(res, 200, newMentor);
        }
        return response.success(res, 201, 'user is not a mentor');
      }
      return response.error(res, 500, 'user is not found');
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
      if (mentorChoice) return response.success(res, 201, mentorChoice);
      return response.error(res, 404, 'could assign mentoring type to mentor');
    } catch (error) {
      return response.error(res, 404, error.message);
    }
  }
};
