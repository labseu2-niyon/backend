const sequelize = require('sequelize');
const models = require('../../database/models');
const response = require('../helpers/response');

const { Op } = sequelize;
module.exports = {
  async getConnectionsForUser(req, res) {
    const { userId } = req.body;
    try {
      const connections = await models.Connections.findAll({
        where: {
          [Op.or]: [{ user_id: userId }, { request_user_id: userId }]
        }
        // attributes: ['id', 'tech_name']
      });
      return response.success(res, 200, connections);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  }

  // async makeConnectionRequest(req, res) {
  //   const { userId, requestUserId } = req.body;
  //   try {
  //   } catch (error) {}
  // }
};
