module.exports = (sequelize, DataTypes) => {
  const Locations = sequelize.define(
    'Locations',
    {
      country_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: {
            args: 2,
            msg: 'Country name should be atleast 2 characters long'
          }
        }
      },
      city_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          min: {
            args: 2,
            msg: 'City name should be atleast 2 characters long'
          }
        }
      }
    },
    {}
  );
  Locations.associate = models => {
    // associations can be defined here
    Locations.hasMany(models.Users);
    Locations.hasMany(models.Mentors);
    Locations.hasMany(models.Mentees);
  };
  return Locations;
};
