const request = require('supertest');
const server = require('../server');

describe('Autocomplete /api/autocomplete/:place', () => {
  it('should return an array of possible location', async () => {
    return request(server)
      .get('/api/autocomplete/enugu')
      .then(res => {
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.status).toBe(200);
      });
  });
  it('should return an empty array for unknown location', async () => {
    return request(server)
      .get('/api/autocomplete/ydggdhsteaffa')
      .then(res => {
        expect(res.body.data).not.toBe(undefined);
        expect(res.status).toBe(200);
      });
  });
});
