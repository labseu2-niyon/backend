/* eslint-disable no-unused-vars */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tech_jobs', [
      {
        industry_id: 1,
        tech_name: 'IT Professional',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Blockchain developer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Games developer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'UX Designer & UI Developer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'SQL Developer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Web Developer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Help Desk Support',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Software Engineer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Data Entry',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'DevOps Engineer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Network Administrator',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Information Security Analyst',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Artificial Intelligence Engineer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Cloud Architect',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'IT Manager',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Technical Specialist',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Application Developer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Chief Technology Officer',
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        industry_id: 1,
        tech_name: 'Chief Information Officer',
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tech_jobs', null, {});
  }
};
