const request = require('supertest');
const passport = require('passport');
const server = require('../server');
const authMiddleware = require('../api/middleware/authStrategies');

describe('GET /auth/github', () => {
  it('should return 302', () => {
    jest
      .spyOn(authMiddleware, 'githubStrategy')
      .mockResolvedValue({ success: true });
    return request(server)
      .get('/api/auth/github/')
      .then(res => {
        expect(res.status).toBe(302);
      });
  });
  it('should return 302', () => {
    jest
      .spyOn(authMiddleware, 'githubStrategy')
      .mockResolvedValue({ success: true });
    jest.spyOn(passport, 'authenticate').mockResolvedValue({ success: true });
    return request(server)
      .get('/api/auth/github/callback')
      .then(res => {
        expect(res.status).toBe(302);
      });
  });
});
