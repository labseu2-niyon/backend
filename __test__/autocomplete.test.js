const request = require('supertest');
const server = require('../server');

describe('Autocomplete /api/autocomplete/:place', () => {
  xit('should return an array of possible location', async done => {
    try {
      const res = await request(server).get('/api/autocomplete/enugu');
      console.log(res.body.data);
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.status).toBe(200);
      done();
    } catch (err) {
      done(`failed: ${JSON.stringify(err)}`);
    }
  }, 10000);
});
