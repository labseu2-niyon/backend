module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define(
    'Chats',
    {
      sender_id: {
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
      reciever_id: {
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
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'a chat message is required'
          }
        }
      },
      connection_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            args: true,
            msg: 'connection id is required'
          },
          isInt: {
            args: true,
            msg: 'Please enter a valid connection'
          }
        }
      }
    },
    {}
  );
  Chats.associate = models => {
    // associations can be defined here
    Chats.belongsTo(models.Connections, {
      foriegnKey: 'connection_id',
      as: 'connection',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Chats.belongsTo(models.Users, {
      foriegnKey: 'sender_id',
      as: 'sender',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Chats.belongsTo(models.Users, {
      foriegnKey: 'reciever_id',
      as: 'reciever',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Chats;
};
