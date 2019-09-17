/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Chats',
      [
        {
          reciever_id: 2,
          read: true,
          connection_id: 1,
          sender_id: 1,
          message: 'Hello there how are you',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          reciever_id: 1,
          read: false,
          connection_id: 1,
          sender_id: 2,
          message: 'I am fine, Hello there how are you',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          reciever_id: 2,
          read: false,
          connection_id: 1,
          sender_id: 1,
          message: 'Not too bad',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Chats', null, {});
  }
};
