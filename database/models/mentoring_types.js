/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const Mentoring_types = sequelize.define(
    'Mentoring_types',
    {
      mentor_type_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Please enter mentoring type name'
          }
        }
      }
    },
    {}
  );
  Mentoring_types.associate = models => {
    // associations can be defined here
    Mentoring_types.belongsToMany(models.Mentors, {
      through: 'Mentors_choices',
      foreignKey: 'mentor_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Mentoring_types.belongsToMany(models.Mentees, {
      through: 'Mentees_choices',
      foreignKey: 'mentee_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Mentoring_types;
};
