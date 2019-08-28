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
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'c001@gmail.com',
          password: 'password',
          username: 'john',
          resetPasswordToken: 'niyon',
          resetPasswordExpires: Date.now(),
          location_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          first_name: 'John',
          last_name: 'Doe',
          email: 'c0012@gmail.com',
          password: 'password',
          username: 'john',
          resetPasswordToken: 'niyonapp',
          resetPasswordExpires: Date.now() + 360000,
          location_id: 2,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
