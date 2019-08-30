const request = require('supertest');
const fs = require('fs');
const server = require('../server');
const jwt = require('../api/helpers/jwt');
const mail = require('../api/helpers/mail');

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
      username: 'john'
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
  xit('should return 200 for succesful upload', async () => {
    const user = {
      id: 1,
      username: 'john'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .patch('/api/user/john/image/upload')
      .set({ token: jwtToken })
      .attach('file', fs.createReadStream('./_test_/assests/contact.png'))
      .then(res => {
        console.log(res.status, res.body);
      });
  });
});

describe('USER PASSWORD RESET', () => {
  it('should return 400 if email is not valid', () => {
    return request(server)
      .post('/api/user/resetpassword')
      .send({ email: 'cristos' })
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Input a valid email');
      });
  });
  it('should return 404 if email is not found', () => {
    return request(server)
      .post('/api/user/resetpassword')
      .send({ email: 'cristos@gmail.com' })
      .then(res => {
        expect(res.status).toBe(404);
        expect(res.body.message).toBe('User not found');
      });
  });
  it('should send an email', () => {
    jest.spyOn(mail, 'passwordResetMail').mockResolvedValue({ success: true });
    return request(server)
      .post('/api/user/resetpassword')
      .send({ email: 'nmereginivincent@gmail.com' })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.data).toBe('Email sent to nmereginivincent@gmail.com');
      });
  });
  it('should return a 400 if password type is not correct', () => {
    return request(server)
      .patch('/api/user/newpassword')
      .send({ password: '123' })
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Password must be at least 5 characters');
      });
  });
  it('should return 401 with invalid token', () => {
    return request(server)
      .patch('/api/user/newpassword?token="yregfdbdhdghghhfdhdh"')
      .send({ password: '1234567' })
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Invalid token to reset password');
      });
  });
  it('should return a 400 if token is expired', () => {
    return request(server)
      .patch('/api/user/newpassword?token=niyon')
      .send({ password: '1234567' })
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Password reset have expired');
      });
  });
  it('should return a 200 for successful password reset', () => {
    return request(server)
      .patch('/api/user/newpassword?token=niyonapp')
      .send({ password: '1234567' })
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body.data).toBe('Password reset was succesful');
      });
  });
});

describe('GET /users', () => {
  it('should return a 201 code', async () => {
    const user = {
      id: 1,
      username: 'john'
    };
    const jwtToken = await jwt.generateToken(user);
    return request(server)
      .get('/api/user/john/users')
      .set({ token: jwtToken })
      .then(res => {
        expect(res.status).toBe(200);
      });
  });

  it('should return 401 if no token is provided', () => {
    return request(server)
      .get('/api/user/john/users')
      .then(res => {
        expect(res.status).toBe(401);
        expect(res.body.message).toBe('Token is required');
      });
  });

  // it('should return 401 if token is invalid', () => {
  //   return request(server)
  //     .patch('/api/user/:damola/profile')
  //     .set({ token: 'gdgfhhrbgegq2ehnfnsnjthrtn' })
  //     .send()
  //     .then(res => {
  //       expect(res.status).toBe(401);
  //       expect(res.body.message).toBe('Error token type');
  //     });
  // });
});

// describe('PATCH /:username/profile', () => {
//   it('should return an object if the body is created', () => {
//     return request(server)
//       .patch('api/user/:damola/profile')
//       .send({
//         firstName: 'Damola',
//         lastName: 'Adewunmi',
//         eMail: 'damolasd@gmail.com',
//         bio: 'Lambda School',
//         locatiionId: 20
//       })
//       .then(res => {
//         expect(res.status).toBe(201);
//         expect(res.body).toBe(Object);
//       });
//   });
// });
