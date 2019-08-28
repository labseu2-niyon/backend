// const should = require('should');
// const assert = require('assert');
const request = require('supertest');
const server = require('../server');

describe('Get list of mentors', () => {
  it('test home endpoint ', () => {
    return request(server)
      .get('api/mentor')
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.message).toBe('Mentor routes can be seen here');
      });
  });
});
