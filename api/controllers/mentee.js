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
      if (mentees) {
        return response.success(res, 200, mentees);
      }
      return response.error(res, 404, 'No Mentee found');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async makeUserMentee(req, res) {
    try {
      const { locationId, industryId } = req.body;
      const { username } = req.params;
      const user = await models.Users.findOne({
        attributes: ['id'],
        where: { username }
      });
      const userId = user.dataValues.id;
      if (userId) {
        const mentee = await models.Mentees.create({
          user_id: userId,
          location_id: locationId,
          industry_id: industryId
        });
        if (mentee) {
          return response.success(res, 201, mentee);
        }
        return response.error(res, 404, 'Could not create Mentee');
      }
      return response.error(res, 404, `user ${username} does not exist`);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async checkifUserIsMentee(req, res) {
    try {
      const { username } = req.params;
      const user = await models.Users.findOne({
        attributes: ['id'],
        where: { username }
      });
      if (user) {
        const userId = user.dataValues.id;
        const mentee = await models.Mentees.findOne({
          where: { user_id: userId },
          attributes: ['id', 'location_id', 'industry_id']
        });
        if (mentee) {
          const newMentee = { mentee: true };
          return response.success(res, 200, newMentee);
        }
        return response.success(res, 201, 'user is not a mentee');
      }
      return response.error(res, 404, 'user is not found');
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
      if (menteeChoice) return response.success(res, 201, menteeChoice);
      return response.error(
        res,
        404,
        'Could not assign mentoring type to mentee'
      );
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  }
};
