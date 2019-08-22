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
            msg: 'Please enter your location'
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
        type: DataTypes.STRING,
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
    Mentees.belongTo(models.Users, {
      foriegnKey: 'user_id',
      as: 'user',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Mentees.belongTo(models.Locations, {
      foriegnKey: 'location_id',
      as: 'location',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Mentees.belongTo(models.Industries, {
      foriegnKey: 'industry_id',
      as: 'industry',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Mentees;
};
