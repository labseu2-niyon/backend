const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getAllJobs(req, res) {
    try {
      const jobs = await models.Tech_jobs.findAll({
        attributes: ['tech_name']
      });
      if (jobs) return response.success(res, 200, jobs);

      return response.error(res, 404, 'Could not fetch jobs');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  }
};
