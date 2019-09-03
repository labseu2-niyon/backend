const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getAllTypes(req, res) {
    try {
      const types = await models.Mentoring_types.findAll();
      if (types) return response.success(res, 200, types);

      return response.error(res, 404, 'Could not fetch Types');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  }
};
