module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          iisAlphanumeric: {
            msg: 'Please enter your firstname'
          }
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlphanumeric: {
            msg: 'Please enter your lastname'
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            msg: 'Please enter your username'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            msg: 'Please enter a valid email'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true
      },
      biography: {
        type: DataTypes.STRING,
        allowNull: true
      },
      profile_picture: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: {
            msg: 'Please enter a valid image url'
          }
        }
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            msg: 'Please enter your location'
          }
        }
      }
    },
    {}
  );
  Users.associate = models => {
    // associations can be defined here
    Users.belongTo(models.Locations, {
      foriegnKey: 'location_id',
      as: 'location',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Users.hasOne(models.Mentors);
    Users.hasOne(models.Mentees);
    Users.hasOne(models.SocialMedias);
  };
  return Users;
};
