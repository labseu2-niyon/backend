const request = require('supertest');
const server = require('../server');

describe('Get /types/all', () => {
  it('should return a 200 code', async () => {
    return request(server)
      .get('/api/types/all')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toEqual('application/json');
      });
  });
});
