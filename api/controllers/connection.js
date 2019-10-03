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
            as: 'request_user',
            include: [
              {
                model: models.Locations,
                as: 'location',
                attributes: ['country_name', 'city_name']
              }
            ]
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
            as: 'sender_user',
            include: [
              {
                model: models.Locations,
                as: 'location',
                attributes: ['country_name', 'city_name']
              }
            ]
          }
        ],
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
      const received = connections
        .filter(c => c.request_user_id === parseInt(userId, 10))
        .map(m => {
          return {
            id: m.id,
            accepted: m.accepted,
            pending: m.pending,
            connection: m.sender_user
          };
        });
      return response.success(res, 200, { sent, received });
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
            as: 'request_user',
            include: [
              {
                model: models.Locations,
                as: 'location',
                attributes: ['country_name', 'city_name']
              }
            ]
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
            as: 'sender_user',
            include: [
              {
                model: models.Locations,
                as: 'location',
                attributes: ['country_name', 'city_name']
              }
            ]
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
    if ((senderUserId, requestUserId)) {
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
    } else {
      return response.error(
        res,
        400,
        'Please provide senderUserId and requestUserId'
      );
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
      return response.success(res, 200, conn);
    } catch (error) {
      return response.error(res, 500, error);
    }
  },

  async updateConnection(req, res) {
    const { connectionId } = req.params;
    if (Object.keys(req.body).includes('accepted' || 'pending' || 'rejected')) {
      try {
        const conn = await models.Connections.update(
          { ...req.body },
          { where: { id: connectionId } }
        );
        return response.success(res, 200, conn);
      } catch (error) {
        return response.error(res, 500, error);
      }
    } else {
      return response.error(
        res,
        400,
        'Please provide either accepted, pending or rejected fields'
      );
    }
  }

  // async checkConnection(req, res) {
  //   const { senderUserId, requestUserId } = req.body;
  //   try {
  //     const conn = await models.Connections.findAll({
  //       where: {
  //         sender_user_id: senderUserId,
  //         request_user_id: requestUserId
  //       }
  //     });
  //     const conn1 = await models.Connections.findAll({
  //       where: {
  //         sender_user_id: senderUserId,
  //         request_user_id: requestUserId
  //       }
  //     });
  //   } catch (error) {
  //     response.error(res, 500, error);
  //   }
  // }
};
