const request = require('supertest');
const server = require('../server');
const jwt = require('../api/helpers/jwt');
// const should = require('should');

describe('PATCH /:username/image/upload', () => {
  it('should return 401 if no token is provided', () => {
    return request(server)
      .patch('/api/user/:vincent/image/upload')
      .send({})
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Token is required');
      });
  });
  it('should return 401 if token is invalid', () => {
    return request(server)
      .patch('/api/user/:vincent/image/upload')
      .set({ token: 'gdgfhhrbgegq2ehnfnsnjthrtn' })
      .send()
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Error token type');
      });
  });
  it("should return 404 if user doesn't exists", async () => {
    const user = {
      id: 1,
      username: 'Vincent'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .patch('/api/user/:cristos/image/upload')
      .set({ token: jwtToken })
      .send()
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Error user acces');
      });
  });
});

describe('GET /users', () => {
  it('should return ', () => {
    return request(server)
      .get('/api/user/all')
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body).toBe(Object);
      });
  });

  it('should return 401 if token is invalid', () => {
    return request(server)
      .patch('/api/user/:damola/profile')
      .set({ token: 'gdgfhhrbgegq2ehnfnsnjthrtn' })
      .send()
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Error token type');
      });
  });

  // it('should return ', () => {
  //   return request(server)
  //     .get('/api/user/all')
  //     .then(res => {
  //       expect(res.status).toBe(201);
  //       expect(res.body.message).toBe(Object);
  //     });
  // });
});

describe('PATCH /:username/profile', () => {
  it('should return an object if the body is created', () => {
    return request(server)
      .patch('api/user/:damola/profile')
      .send({
        firstName: 'Damola',
        lastName: 'Adewunmi',
        eMail: 'damolasd@gmail.com',
        bio: 'Lambda School',
        locatiionId: 20
      })
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.body).toBe(Object);
      });
  });
});
