const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getAllJobs(req, res) {
    try {
      const jobs = await models.Tech_jobs.findAll({
        attributes: ['id', 'tech_name']
      });
      return response.success(res, 200, jobs);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  }
};
