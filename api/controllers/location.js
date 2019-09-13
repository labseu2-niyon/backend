const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getCountries(req, res, next) {
    try {
      const countries = await models.Locations.findAll({
        attributes: ['country_name'],
        returning: true
      });
      return response.success(res, 200, countries);
    } catch (error) {
      return next({ message: error.message });
    }
  },
  // currently not in use
  async getCitiesByCountries(req, res, next) {
    try {
      const { country } = req.params;
      const cities = await models.Locations.findAll({
        attributes: ['city_name'],
        where: { country_name: country },
        returning: true
      });
      if (!cities.length) {
        return response.success(res, 200, 'No cities saved in the country');
      }
      return response.success(res, 200, cities);
    } catch (error) {
      return next({ message: error.message });
    }
  },

  async findOrCreateLocation(req, res, next) {
    try {
      const { cityName, countryName } = req.body;
      const locations = await models.Locations.findOrCreate({
        where: { country_name: countryName, city_name: cityName },
        attributes: ['id']
      });
      const locationId = locations[0].dataValues.id;
      return response.success(res, 201, locationId);
    } catch (error) {
      return next({ message: error.message });
    }
  }
};
