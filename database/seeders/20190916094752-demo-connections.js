/* eslint-disable no-unused-vars */

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Connections',
      [
        {
          sender_user_id: 1,
          request_user_id: 2,
          pending: false,
          accepted: true,
          rejected: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          sender_user_id: 3,
          request_user_id: 1,
          pending: false,
          accepted: true,
          rejected: false,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          sender_user_id: 2,
          request_user_id: 3,
          pending: true,
          accepted: false,
          rejected: false,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Connections', null, {});
  }
};
