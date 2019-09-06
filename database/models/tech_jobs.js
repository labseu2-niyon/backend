/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const Tech_jobs = sequelize.define(
    'Tech_jobs',
    {
      tech_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: {
            args: true,
            msg: 'Please enter a valid tech_name'
          }
        }
      },
      industry_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: 'Please enter industry'
          }
        }
      }
    },
    {}
  );
  Tech_jobs.associate = models => {
    // associations can be defined here
    Tech_jobs.belongsTo(models.Industries, {
      foriegnKey: 'industry_id',
      as: 'industry',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Tech_jobs;
};
