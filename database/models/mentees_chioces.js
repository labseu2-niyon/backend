/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const Mentors_choices = sequelize.define(
    'Mentees_choices',
    {
      mentoring_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: 'Please enter your mentoring type id'
          }
        }
      },
      mentee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: 'Please enter your mentee id'
          }
        }
      }
    },
    {}
  );
  Mentors_choices.associate = models => {
    // associations can be defined here
    Mentors_choices.belongsTo(models.Mentoring_types, {
      foreignKey: 'mentoring_type_id',
      as: 'mentoring_type_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Mentors_choices.belongsTo(models.Mentees, {
      foreignKey: 'mentee_id',
      as: 'mentee_id',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Mentors_choices;
};
