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
      sender_user_id: {
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
    {
      indexes: [
        {
          unique: true,
          fields: ['sender_user_id', 'request_user_id']
        }
      ]
    }
  );
  Connections.associate = models => {
    // associations can be defined here
    Connections.belongsTo(models.Users, {
      foriegnKey: 'sender_user_id',
      as: 'sender_user',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Connections.belongsTo(models.Users, {
      foriegnKey: 'request_user_id',
      as: 'request_user',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Connections;
};
