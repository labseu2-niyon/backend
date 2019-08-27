const request = require('supertest');
const server = require('../server');
const jwt = require('../api/helpers/jwt');

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
