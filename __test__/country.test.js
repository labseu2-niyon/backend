const request = require('supertest');
const server = require('../server');

describe('GET /api/countries/countries', () => {
  it('should return a 201 after getting all countries', () => {
    return request(server)
      .get('/api/countries/countries')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(2);
      });
  });
});

describe('GET /api/countries/:country/cities', () => {
  it('should return a 200 if city exists', () => {
    return request(server)
      .get('/api/countries/Nigeria/cities')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveLength(2);
      });
  });

  it('should return a 200 if city dont exists', () => {
    return request(server)
      .get('/api/countries/canada/cities')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.data).toBe('No cities saved in the country');
      });
  });
});
