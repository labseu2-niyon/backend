module.exports = (sequelize, DataTypes) => {
  const Connections = sequelize.define(
    'Connections',
    {
      pending: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      accepted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      rejected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'user id is required'
          },
          isInt: {
            args: true,
            msg: 'Please enter a valid user'
          }
        }
      },
      request_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'user id is required'
          },
          isInt: {
            args: true,
            msg: 'Please enter a valid user'
          }
        }
      }
    },
    {}
  );
  Connections.associate = models => {
    // associations can be defined here
    Connections.belolongsTo(models.Users, {
      foriegnKey: 'user_id',
      as: 'user',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Connections.belolongsTo(models.Users, {
      foriegnKey: 'request_user_id',
      as: 'request',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Connections;
};
