/* eslint-disable camelcase */
module.exports = (sequelize, DataTypes) => {
  const Social_medias = sequelize.define(
    'Social_medias',
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            args: true,
            msg: 'Please enter a valid user id'
          }
        }
      },
      facebook: {
        type: DataTypes.STRING,
        allowNull: true
      },
      linkedin: {
        type: DataTypes.STRING,
        allowNull: true
      },
      twitter: {
        type: DataTypes.STRING,
        allowNull: true
      },
      github: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
    {}
  );
  Social_medias.associate = models => {
    // associations can be defined here
    Social_medias.belongsTo(models.Users, {
      foreignKey: 'user_id',
      as: 'user',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Social_medias;
};
