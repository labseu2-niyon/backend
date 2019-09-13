const request = require('supertest');
const server = require('../server');

describe('POST /api/location', () => {
  it('should return a 400 if country name is not provided', () => {
    return request(server)
      .post('/api/location/getLocation')
      .send({})
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body.message.cityName[0]).toBe(
          'The cityName field is required.'
        );
      });
  });
  it('should return a 201 if location was created', () => {
    return request(server)
      .post('/api/location/getLocation')
      .send({ cityName: 'kaduna', countryName: 'Nigeria' })
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body.data).toBe(3);
      });
  });
});
