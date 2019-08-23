module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          iisAlphanumeric: {
            args: true,
            msg: 'Please enter your firstname'
          }
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Please enter your lastname'
          }
        }
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Please enter your username'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: {
            args: true,
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
            args: true,
            msg: 'Please enter a valid image url'
          }
        }
      },
      location_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            args: true,
            msg: 'Please enter your location'
          }
        }
      },
      auth_id: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Please enter the user id from social auth'
          }
        }
      }
    },
    {}
  );
  Users.associate = models => {
    // associations can be defined here
    Users.belongsTo(models.Locations, {
      foreignKey: 'location_id',
      as: 'location',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Users.hasOne(models.Mentors);
    Users.hasOne(models.Mentees);
    // Users.hasOne(models.SocialMedias);
  };
  return Users;
};
