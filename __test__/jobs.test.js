const request = require('supertest');
const server = require('../server');

describe('Get /jobs/all', () => {
  it('should return a 200 code', async () => {
    return request(server)
      .get('/api/jobs/all')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toEqual('application/json');
      });
  });
});
