module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    'Locations',
    {
      country_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Please enter your country name'
          }
        }
      },
      city_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Please enter your country name'
          }
        }
      }
    },
    {}
  );
  Locations.associate = models => {
    // associations can be defined here
    Locations.hasMany(models.Users);
  };
  return Locations;
};
