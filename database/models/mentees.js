module.exports = (sequelize, DataTypes) => {
  const Mentees = sequelize.define(
    'Mentees',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: 'Please enter your user id'
          }
        }
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: 'Please enter your location'
          }
        }
      },
      industry_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Please enter your industry name'
          }
        }
      }
    },
    {}
  );
  Mentees.associate = models => {
    // associations can be defined here
    Mentees.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Mentees.belongsTo(models.Locations, {
      foreignKey: 'location_id',
      as: 'location',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Mentees.belongsTo(models.Industries, {
      foreignKey: 'industry_id',
      as: 'industry',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Mentees.belongsToMany(models.Mentoring_types, {
      through: 'Mentees_choices',
      foreignKey: 'mentoring_type_id',
      as: 'Mentee_choice',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Mentees;
};
