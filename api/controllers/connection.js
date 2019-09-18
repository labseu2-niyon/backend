const Sequelize = require('sequelize');
const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getConnectionsRequestsForUser(req, res) {
    const { userId } = req.params;
    try {
      const connections = await models.Connections.findAll({
        attributes: [
          'id',
          'sender_user_id',
          'request_user_id',
          'accepted',
          'pending'
        ],
        include: [
          {
            model: models.Users,
            attributes: [
              'id',
              'first_name',
              'last_name',
              'username',
              'profile_picture'
            ],
            as: 'request_user'
          },
          {
            model: models.Users,
            attributes: [
              'id',
              'first_name',
              'last_name',
              'username',
              'profile_picture'
            ],
            as: 'sender_user'
          }
        ],
        order: [['updated_at', 'DESC']],
        where: {
          [Sequelize.Op.or]: [
            { sender_user_id: userId },
            { request_user_id: userId }
          ],
          rejected: false,
          accepted: false
        }
      });
      const sent = connections
        .filter(c => c.sender_user_id === parseInt(userId, 10))
        .map(m => {
          return {
            id: m.id,
            accepted: m.accepted,
            pending: m.pending,
            connection: m.request_user
          };
        });
      const recieved = connections
        .filter(c => c.request_user_id === parseInt(userId, 10))
        .map(m => {
          return {
            id: m.id,
            accepted: m.accepted,
            pending: m.pending,
            connection: m.sender_user
          };
        });
      return response.success(res, 200, { sent, recieved });
    } catch (error) {
      return response.error(res, 500, error);
    }
  },

  async getAcceptedConnections(req, res) {
    const { userId } = req.params;
    try {
      const connections = await models.Connections.findAll({
        attributes: ['id', 'sender_user_id', 'request_user_id'],
        include: [
          {
            model: models.Users,
            attributes: [
              'id',
              'first_name',
              'last_name',
              'username',
              'profile_picture'
            ],
            as: 'request_user'
          },
          {
            model: models.Users,
            attributes: [
              'id',
              'first_name',
              'last_name',
              'username',
              'profile_picture'
            ],
            as: 'sender_user'
          }
        ],
        order: [['updated_at', 'DESC']],
        where: {
          [Sequelize.Op.or]: [
            { sender_user_id: userId },
            { request_user_id: userId }
          ],
          accepted: true,
          rejected: false
        }
      });
      const result = connections.map(m => {
        const user =
          m.request_user_id === parseInt(userId, 10)
            ? m.sender_user
            : m.request_user;
        return { id: m.id, connection: user };
      });
      return response.success(res, 200, result);
    } catch (error) {
      return response.error(res, 500, error);
    }
  },

  async makeConnectionRequest(req, res) {
    const { senderUserId, requestUserId } = req.body;
    try {
      const connection = await models.Connections.create({
        sender_user_id: senderUserId,
        request_user_id: requestUserId,
        pending: true
      });
      return response.success(res, 201, connection);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async getConnection(req, res) {
    const { connectionId } = req.params;
    try {
      const conn = await models.Connections.findOne({
        attributes: [
          'id',
          'sender_user_id',
          'request_user_id',
          'accepted',
          'pending'
        ],
        where: { id: connectionId, rejected: false }
      });
      response.success(res, 200, conn);
    } catch (error) {
      response.error(res, 500, error);
    }
  },

  async updateConnection(req, res) {
    const { connectionId } = req.params;
    try {
      const conn = await models.Connections.update(
        { ...req.body },
        { where: { id: connectionId } }
      );
      response.success(res, 200, conn);
    } catch (error) {
      response.error(res, 500, error);
    }
  }
};
