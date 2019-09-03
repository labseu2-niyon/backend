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
      return response.error(res, 404, 'Not Mentee found');
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
  }
};
