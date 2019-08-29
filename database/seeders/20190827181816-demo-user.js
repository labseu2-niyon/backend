/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'nmereginivincent@gmail.com',
          password: 'password',
          username: 'john',
          location_id: 1,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'c001@gmail.com',
          password: 'password',
          username: 'john1',
          reset_password_token: 'niyon',
          reset_password_expires: Date.now(),
          location_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'c0012@gmail.com',
          password: 'password',
          username: 'john2',
          reset_password_token: 'niyonapp',
          reset_password_expires: Date.now() + 360000,
          location_id: 2,
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
