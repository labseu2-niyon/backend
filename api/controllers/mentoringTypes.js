const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getAllTypes(req, res) {
    try {
      const types = await models.Mentoring_types.findAll({
        attributes: ['id', 'mentor_type_name']
      });
      return response.success(res, 200, types);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  }
};
