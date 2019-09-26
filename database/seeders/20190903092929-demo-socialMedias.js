/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Social_medias', [
      {
        user_id: 1,
        facebook: 'facebook.com',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        user_id: 2,
        linkedin: 'facebookin.com',
        facebook: 'facebooking.com',
        github: 'damolasd',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Social_medias', null, {});
  }
};
