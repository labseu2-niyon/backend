const request = require('supertest');
const server = require('../server');

const app = request(server);

describe('Server', () => {
  it('[GET] / works!', done => {
    return app
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBe('API endpoints exposed at /api');
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});
