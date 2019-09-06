/* eslint-disable no-dupe-keys */
const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getAllMentees(req, res) {
    try {
      const mentees = await models.Mentees.findAll({
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
      return response.success(res, 200, mentees);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async makeUserMentee(req, res) {
    try {
      const { locationId, industryId } = req.body;
      const userId = req.user.id;
      const mentee = await models.Mentees.create({
        user_id: userId,
        location_id: locationId,
        industry_id: industryId
      });
      return response.success(res, 201, mentee);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async checkIfUserIsMentee(req, res) {
    try {
      const userId = req.user.id;
      const mentee = await models.Mentees.findOne({
        where: { user_id: userId },
        attributes: ['id', 'location_id', 'industry_id']
      });
      if (mentee) {
        const newMentee = { mentee: true };
        return response.success(res, 200, newMentee);
      }
      return response.success(res, 200, 'user is not a mentee');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async addMenteeChoice(req, res) {
    try {
      const { mentorTypeId, menteeId } = req.body;
      const menteeChoice = await models.Mentees_choices.create({
        mentoring_type_id: mentorTypeId,
        mentee_id: menteeId
      });
      return response.success(res, 201, menteeChoice);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  }
};
