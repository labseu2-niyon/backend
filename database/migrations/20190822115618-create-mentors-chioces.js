/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Mentors_chioces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mentoring_type_id: {
        type: Sequelize.STRING,
        allowNull: false
        // references: {
        //   model: 'Mentoring_types',
        //   key: 'id'
        //   // as: 'location'
        // }
      },
      mentor_id: {
        type: Sequelize.STRING,
        allowNull: false
        // references: {
        //   model: 'Mentors',
        //   key: 'id'
        //   // as: 'location'
        // }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Mentors_chioces');
  }
};
