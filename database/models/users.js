/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    'Users',
    {
      first_name: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isAlphanumeric: {
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
          notNull: {
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
        allowNull: true
      },
      public_id: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reset_password_token: {
        type: DataTypes.STRING,
        allowNull: true
      },
      reset_password_expires: {
        type: DataTypes.BIGINT,
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
      job_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          isInt: {
            args: true,
            msg: 'Please enter your job'
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
    Users.belongsTo(models.Tech_jobs, {
      foreignKey: 'job_id',
      as: 'job',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Users.hasOne(models.Mentors);
    Users.hasOne(models.Mentees);
    Users.hasMany(models.Social_medias);
  };
  Users.hashPassword = async user => {
    // console.log(user);
    const changedPassword = await user.changed(
      'password',
      user.dataValues.password
    );
    if (
      changedPassword._previousDataValues.password !==
      changedPassword.dataValues.password
    ) {
      const hash = await bcrypt.hash(user.dataValues.password, 14);
      await user.setDataValue('password', hash);
    }
    return user;
  };
  return Users;
};
