const request = require('supertest');
const server = require('../server');
const jwt = require('../api/helpers/jwt');

describe('Get /mentor/:username/mentors', () => {
  it('should return a 200 code', async () => {
    const user = {
      id: 1,
      username: 'john'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .get('/api/mentor/john/mentors')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toEqual('application/json');
      });
  });

  it('should return 401 if no token is provided', () => {
    return request(server)
      .get('/api/mentor/john/mentors')
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Token is required');
      });
  });

  it('should return a 404 code user does not exist', async () => {
    const user = {
      id: 5,
      username: 'damola'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .get('/api/mentor/damola/mentors')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
      });
  });
});

describe('POST /mentor/:username/mentor', () => {
  it('should return a 201 code', async () => {
    const user = {
      id: 2,
      username: 'john1'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .post('/api/mentor/john1/mentor')
      .send({ locationId: 2, industryId: 1 })
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.type).toEqual('application/json');
      });
  });
  it('should return 401 if no token is provided', () => {
    return request(server)
      .post('/api/mentor/john1/mentor')
      .send({ locationId: 2, industryId: 1 })
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Token is required');
      });
  });
  it('should return a 404 code if the wrong token is sent', async () => {
    const user = {
      id: 5,
      username: 'damola'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .post('/api/mentor/john/mentor')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Error user access');
        expect(res.body.message).toBe('Error user access');
      });
  });
});
