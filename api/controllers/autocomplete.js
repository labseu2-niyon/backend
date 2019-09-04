// const Axios = require('axios');
const fetch = require('node-fetch');
const uuid = require('uuid');
const response = require('../helpers/response');

module.exports = {
  async autoComplete(req, res) {
    const { place } = req.params;
    try {
      const request = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}
        &key=AIzaSyCJt2Ze7Xg7mt7mR9ylZp2Nrwhc2AUxu2c&sessiontoken=${uuid()}&geometry`
      );
      const result = await request.json();
      const locations = result.predictions.map(p => p.description);
      // returns the city and country from each location
      const reformed = locations
        .map(v => v.split`,`)
        .map(a =>
          a
            .slice(-2)
            .join(',')
            .trim()
        );
      // new Set(reformed) removes duplicate locations
      response.success(res, 200, [...new Set(reformed)]);
    } catch (error) {
      response.error(res, 500, `Couldn't get possible locations`);
    }
  }
};
