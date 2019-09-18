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
          order: [['updated_at', 'ASC']],
          where: {
            accepted: true,
            [Sequelize.Op.or]: [
              { sender_user_id: userId },
              { request_user_id: userId }
            ]
          }
        });
        const users = connectedList.map(connection => {
          return {
            connectionId: connection.id,
            requestUser: connection.dataValues.request_user.dataValues,
            sentuser: connection.dataValues.sender_user.dataValues
          };
        });
        // console.log(users);
        socket.emit('connectionList', users);
      } catch (error) {
        console.error(error);
      }
      // create a room for users to chat
      socket.on('chatOpen', async connection => {
        const userRoom = Object.keys(socket.rooms)[1];
        socket.leave(userRoom);
        socket.join(connection.chatId);
        try {
          const chats = await models.Chats.findAll({
            attributes: [
              'id',
              'sender_id',
              'reciever_id',
              'created_at',
              'connection_id',
              'read',
              'message'
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
                as: 'sender'
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
                as: 'reciever'
              }
            ],
            order: [['created_at', 'ASC']],
            where: { connection_id: connection.chatId }
          });
          const chatMessages = chats.map(chat => {
            return {
              id: chat.dataValues.id,
              connectionId: chat.dataValues.connection_id,
              read: chat.dataValues.read,
              dateSent: chat.dataValues.created_at,
              message: chat.dataValues.message,
              sender: chat.dataValues.sender.dataValues,
              reciever: chat.dataValues.reciever.dataValues
            };
          });
          // console.log(chatMessages);
          socket.emit('chatHistory', chatMessages);
        } catch (error) {
          console.error(error);
        }
      });
      socket.on('messegeAdd', async chatInfo => {
        try {
          const message = {
            sender_id: chatInfo.sender,
            message: chatInfo.message,
            connection_id: chatInfo.connectionId,
            reciever_id: chatInfo.receiver
          };
          await models.Chats.create(message);
        } catch (error) {
          console.error(error);
        }
      });
    });
  }
};
