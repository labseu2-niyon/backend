module.exports = (sequelize, DataTypes) => {
  const Chats = sequelize.define(
    'Chats',
    {
      sender: {
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
      reciever: {
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
      foriegnKey: 'sender',
      // as: 'sender',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    Chats.belongsTo(models.Users, {
      foriegnKey: 'reciever',
      // as: 'reciever',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Chats;
};
