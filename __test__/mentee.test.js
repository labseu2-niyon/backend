const request = require('supertest');
const server = require('../server');
const jwt = require('../api/helpers/jwt');

let serve;
// let agent;

beforeEach(done => {
  serve = server.listen(4000, err => {
    if (err) return done(err);

    // agent = request.agent(serve); // since the application is already listening, it should use the allocated port
    return done();
  });
});

afterEach(done => {
  return serve && serve.close(done);
});

describe('Get /mentee/:username/mentees', () => {
  it('should return a 200 code', async () => {
    const user = {
      id: 1,
      username: 'john'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .get('/api/mentee/john/mentees')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toEqual('application/json');
      });
  });

  it('should return 401 if no token is provided', () => {
    return request(server)
      .get('/api/mentee/john/mentees')
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
      .get('/api/mentee/damola/mentees')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
      });
  });
});

describe('POST /mentee/:username/mentee', () => {
  it('should return a 201 code', async () => {
    const user = {
      id: 2,
      username: 'john1'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .post('/api/mentee/john1/mentee')
      .send({ locationId: 2, industryId: 1 })
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(201);
        expect(res.type).toEqual('application/json');
      });
  });
  it('should return 401 if no token is provided', () => {
    return request(server)
      .post('/api/mentee/john1/mentee')
      .send({ locationId: 2, industryId: 1 })
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Token is required');
      });
  });
  it('should return a 401 code if the wrong token is sent', async () => {
    const user = {
      id: 5,
      username: 'damola'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .post('/api/mentee/john/mentee')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Error user access');
      });
  });
});

describe('GET /:username', () => {
  it('should return 401 if no token is provided', () => {
    return request(server)
      .get('/api/mentee/john')
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
      .get('/api/mentee/damola')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
      });
  });
  it('should return a 200 if user is a mentee', async () => {
    const user = {
      id: 2,
      username: 'john1'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .get('/api/mentee/john1')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.data.mentee).toBe(true);
      });
  });
  it('should return 200 and user not a mentee', async () => {
    const user = {
      id: 3,
      username: 'john2'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .get('/api/mentee/john2')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.data).toBe('user is not a mentee');
      });
  });
});

describe('POST /api/mentee/choice', () => {
  it('should return 500 if no choice', () => {
    return request(server)
      .post('/api/mentee/choice')
      .send({ mentorTypeId: 10, menteeId: 10 })
      .then(res => {
        expect(res.status).toBe(500);
      });
  });
});
