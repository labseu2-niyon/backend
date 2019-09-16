const Sequelize = require('sequelize');
const models = require('../../database/models');

module.exports = {
  chats(sockets) {
    sockets.on('connection', async socket => {
      const userId = socket.handshake.query.id;
      // get a list of all users connected with the user;
      try {
        const connectedList = await models.Connections.findAll({
          attributes: ['id', 'sender_user_id', 'request_user_id', 'accepted'],
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
            accepted: true,
            [Sequelize.Op.or]: [
              { sender_user_id: userId },
              { request_user_id: userId }
            ]
          }
        });
        const user = connectedList.map(connection => {
          return {
            connectionId: connection.id,
            requestUser: connection.dataValues.request_user.dataValues,
            sentuser: connection.dataValues.sender_user.dataValues
          };
        });
        socket.emit('connectionList', user);
      } catch (error) {
        console.error(error);
      }
    });
  }
};
