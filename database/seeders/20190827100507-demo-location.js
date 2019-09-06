/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Locations',
      [
        {
          country_name: 'Nigeria',
          city_name: 'Lagos',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          country_name: 'Nigeria',
          city_name: 'Enugu',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Locations', null, {});
  }
};
