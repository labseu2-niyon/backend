/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Locations',
      [
        {
          country_name: 'Nigeria',
          city_name: 'Lagos',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          country_name: 'Nigeria',
          city_name: 'Enugu',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
