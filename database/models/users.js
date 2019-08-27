/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');

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
          },
          isUnique: {
            args: true,
            msg: 'Email already exists'
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
        allowNull: true
      },
      public_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
      },
      resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
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
          },
          isUnique: {
            args: true,
            msg: 'User already exists'
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate: user => Users.hashPassword(user),
        beforeUpdate: user => Users.hashPassword(user)
      }
    }
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
  Users.hashPassword = async user => {
    // if (!user.dataValues.password) return user _previousDataValues;
    const changedPassword = await user.changed(
      'password',
      user.dataValues.password
    );
    if (
      changedPassword.previous.password !== changedPassword.dataValues.password
    ) {
      const hash = await bcrypt.hash(user.dataValues.password, 14);
      await user.setDataValue('password', hash);
    }
    return user;
  };
  return Users;
};
