/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Mentoring_types',
      [
        {
          mentor_type_name: 'Job Preparation',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          mentor_type_name: 'Coding Skills',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          mentor_type_name: 'Productivity',
          created_at: new Date(),
          updated_at: new Date()
        },
        {
          mentor_type_name: 'Networking',
          created_at: new Date(),
          updated_at: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Mentoring_types', null, {});
  }
};
