const request = require('supertest');
const server = require('../server');

const app = request(server);

describe('Server', () => {
  it('[GET] /api/mentors', done => {
    return app
      .get('/api/mentors')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeTruthy();
        done();
      })
      .catch(error => {
        done(error);
      });
  });
});
