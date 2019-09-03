const Axios = require('axios');
const uuid = require('uuid');
const response = require('../helpers/response');

module.exports = {
  async autoComplete(req, res) {
    const { place } = req.params;
    console.log(place);
    try {
      const result = await Axios.get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${place}
        &key=AIzaSyDCaZJ5l-dUK6_eK7NBiIOdW6zBoxmpMWw&sessiontoken=${uuid()}&geometry`
      );
      const locations = result.data.predictions.map(p => p.description);
      response.success(res, 200, locations);
    } catch (error) {
      response.error(
        res,
        500,
        `Couldn't get possible locations: ${JSON.stringify(error)}`
      );
    }
  }
};
