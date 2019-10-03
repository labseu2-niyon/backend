const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const models = require('../../database/models');
const response = require('../helpers/response');
const mail = require('../helpers/mail');
const secret = require('../../config/secret');
const jwt = require('../helpers/jwt');

module.exports = {
  async getUserByUsername(req, res) {
    try {
      const { username } = req.params;
      const user = await models.Users.findOne({
        where: { username },
        attributes: [
          'id',
          'first_name',
          'last_name',
          'username',
          'email',
          'biography',
          'profile_picture'
        ],
        include: [
          {
            model: models.Locations,
            attributes: ['id', 'city_name', 'country_name'],
            as: 'location'
          },
          {
            model: models.Mentees,
            attributes: ['id'],
            as: 'Mentee',
            include: [
              {
                model: models.Industries,
                attributes: ['industry_name'],
                as: 'industry'
              }
            ]
          },
          {
            model: models.Mentors,
            attributes: ['id'],
            as: 'Mentor',
            include: [
              {
                model: models.Industries,
                attributes: ['industry_name'],
                as: 'industry'
              }
            ]
          },
          {
            model: models.Tech_jobs,
            attributes: ['tech_name'],
            as: 'job',
            include: [
              {
                model: models.Industries,
                attributes: ['industry_name'],
                as: 'industry'
              }
            ]
          }
        ]
      });
      return response.success(res, 200, user);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async getAllUsers(req, res, next) {
    try {
      const users = await models.Users.findAll({
        attributes: [
          'id',
          'first_name',
          'last_name',
          'username',
          'email',
          'biography',
          'profile_picture'
        ],
        include: [
          {
            model: models.Locations,
            attributes: ['id', 'city_name', 'country_name'],
            as: 'location'
          },
          {
            model: models.Mentees,
            attributes: ['id'],
            as: 'Mentee',
            include: [
              {
                model: models.Industries,
                attributes: ['industry_name'],
                as: 'industry'
              }
            ]
          },
          {
            model: models.Mentors,
            attributes: ['id'],
            as: 'Mentor',
            include: [
              {
                model: models.Industries,
                attributes: ['industry_name'],
                as: 'industry'
              }
            ]
          },
          {
            model: models.Tech_jobs,
            attributes: ['tech_name'],
            as: 'job'
          }
        ]
      });
      if (users) return response.success(res, 200, users);
      return response.error(res, 404, 'Could not fetch all users');
    } catch (error) {
      return next({ message: error.message });
    }
  },

  async updateUserPassword(req, res, next) {
    try {
      const { username } = req.params;
      const { password, newPassword } = req.body;
      const hash = await bcrypt.hash(newPassword, 14);
      if (!bcrypt.compareSync(password, req.user.password)) {
        return response.error(res, 403, 'Password did not match');
      }
      const updatePassword = await models.Users.update(
        {
          password: hash
        },
        { where: { username }, returning: true }
      );
      return response.success(res, 200, updatePassword);
    } catch (error) {
      return next({
        message: error.message
      });
    }
  },

  async updateUserProfile(req, res, next) {
    try {
      const { username } = req.params;
      const { firstName, lastName, bio, locationId, jobId } = req.body;

      // const locations = await models.Locations.findOrCreate({
      //   where: { country_name: countryName, city_name: cityName },
      //   attributes: ['id']
      // });
      // const locationId = locations[0].dataValues.id;
      // if (!locationId) {
      //   return response.error(res, 404, 'Location not found');
      // }
      const updateUser = await models.Users.update(
        {
          first_name: firstName,
          last_name: lastName,
          biography: bio,
          location_id: locationId,
          job_id: jobId
        },
        { where: { username }, returning: true }
      );
      return response.success(res, 200, updateUser);
    } catch (error) {
      return next({ message: 'Error updating profile' });
    }
  },

  async createUser(req, res) {
    try {
      const createUser = {
        ...req.body,
        email: req.body.email.toLowerCase(),
        username: req.body.username.toLowerCase()
      };
      const user = await models.Users.create(createUser);
      if (user) {
        const newUser = {
          password: user.password,
          username: user.username,
          email: user.email,
          id: user.id
        };

        const token = await jwt.generateToken(newUser);
        return response.success(res, 201, { user: newUser, token });
      }
      return response.error(res, 400, 'Could not create Profile');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async loginUser(req, res, next) {
    const { email, password } = req.body;

    try {
      const user = await models.Users.findOne({
        where: { email },
        attributes: ['password', 'email', 'username', 'id']
      });
      if (
        Object.keys(user).length &&
        bcrypt.compareSync(password, user.dataValues.password)
      ) {
        const token = await jwt.generateToken(user.dataValues);
        return response.success(res, 200, {
          message: `${email} successfully logged in.`,
          token
        });
      }
      return response.error(res, 401, 'Invalid credentials');
    } catch (error) {
      return next({ message: 'Error logging in user' });
    }
  },

  async uploadUserImage(req, res, next) {
    const { params, file } = req;
    try {
      const user = await models.Users.update(
        { profile_picture: file.secure_url, public_id: file.public_id },
        { where: { username: params.username }, returning: true }
      );
      return response.success(res, 200, user);
    } catch (error) {
      return next({ message: 'Error updating image' });
    }
  },

  async sendPasswordMail(req, res, next) {
    const token = await crypto.randomBytes(20).toString('hex');
    const expiringDate = Date.now() + 360000;
    try {
      const sendMail = await mail.passwordResetMail(
        secret.frontEndUrl,
        token,
        req.userEmail.email,
        req.userEmail.username
      );
      if (!sendMail) {
        return response.error(res, 400, 'Error sending mail try again');
      }
      await models.Users.update(
        {
          reset_password_token: token,
          reset_password_expires: expiringDate
        },
        { where: { email: req.userEmail.email } }
      );
      return response.success(res, 200, `Email sent to ${req.userEmail.email}`);
    } catch (error) {
      return next({ message: 'Error sending mail tryagain' });
    }
  },

  async resetPassword(req, res, next) {
    const { token } = req.query;
    try {
      const user = await models.Users.findOne({
        where: { reset_password_token: token },
        attributes: ['reset_password_expires', 'id']
      });
      if (!user) {
        return response.error(res, 401, 'Invalid token to reset password');
      }
      const savedDate = user.dataValues.reset_password_expires;
      const date = Date.now() - savedDate;
      if (date > 0) {
        return response.error(res, 400, 'Password reset have expired');
      }
      const hash = await bcrypt.hash(req.body.password, 14);
      const newUserPassword = await models.Users.update(
        {
          password: hash,
          // reset_password_expires: '',
          reset_password_token: ''
        },
        {
          where: { id: user.dataValues.id }
        }
      );
      if (!newUserPassword) {
        return response.error(res, 404, 'User not found');
      }
      return response.success(res, 200, 'Password reset was succesful');
    } catch (error) {
      return next({ message: error.message });
    }
  },

  async addSocialMediaAccount(req, res, next) {
    try {
      const { body } = req;
      if (!Object.keys(body).length) {
        return response.error(res, 400, 'Empty body not allowed');
      }
      const socialMedia = await models.Social_medias.create({
        ...body,
        user_id: req.user.id
      });
      return response.success(res, 201, socialMedia);
    } catch (error) {
      return next({ message: 'Error posting users social media handle' });
    }
  }
};
