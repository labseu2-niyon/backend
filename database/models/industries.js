module.exports = (sequelize, DataTypes) => {
  const Industries = sequelize.define(
    'Industries',
    {
      industry_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlphanumeric: {
            args: true,
            msg: 'Please enter your industry name'
          }
        }
      }
    },
    {}
  );
  Industries.associate = models => {
    // associations can be defined here
    Industries.hasMany(models.Mentors);
    Industries.hasMany(models.Mentees);
  };
  return Industries;
};
