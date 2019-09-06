const request = require('supertest');
const server = require('../server');

describe('Autocomplete /api/autocomplete/:place', () => {
  it('should return an array of possible location', async done => {
    try {
      const res = await request(server).get('/api/autocomplete/enugu');
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.status).toBe(200);
      done();
    } catch (err) {
      done(`failed: ${JSON.stringify(err)}`);
    }
  });
  it('should return an empty array for unknown location', async done => {
    try {
      const res = await request(server).get(
        '/api/autocomplete/xyrgvfggyeye633d'
      );
      expect(res.body.data).not.toBeUndefined();
      expect(res.status).toBe(200);
      done();
    } catch (err) {
      done(`failed: ${JSON.stringify(err)}`);
    }
  });
});
