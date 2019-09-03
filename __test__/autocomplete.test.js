const request = require('supertest');
const server = require('../server');

describe('Autocomplete /api/autocomplete/:place', () => {
  it('should return an array of possible location', done => {
    return request(server)
      .get('/api/autocomplete/enugu')
      .then(res => {
        expect(res.body.data.length).toBeGreaterThan(0);
        expect(res.status).toBe(200);
        done();
      })
      .catch(err => {
        done(`failed: ${JSON.stringify(err)}`);
      });
  });
});
