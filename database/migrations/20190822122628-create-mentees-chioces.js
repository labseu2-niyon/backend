/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Mentees_chioces', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mentoring_type_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
        // references: {
        //   model: 'Mentoring_types',
        //   key: 'id'
        //   // as: 'type'
        // }
      },
      mentee_id: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true
        // references: {
        //   model: 'Mentees',
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
    return queryInterface.dropTable('Mentees_chioces');
  }
};
