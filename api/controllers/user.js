const crypto = require('crypto');
const bcrypt = require('bcrypt');
const models = require('../../database/models');
const response = require('../helpers/response');
const mail = require('../helpers/mail');
const secret = require('../../config/secret');
const generateToken = require('../helpers/jwt');

module.exports = {
  async getUserByUsername(req, res) {
    try {
      const { userName } = req.query;
      const user = await models.Users.findOne({
        where: { username: userName }
      });
      if (user) {
        return response.success(res, 201, user);
      }
      return response.error(res, 404, 'User with that username does not exist');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await models.Users.findAll();
      return response.success(res, 201, users);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async createUserProfile(req, res) {
    try {
      const user = await models.Users.create(req.body);
      if (user) {
        return response.success(res, 201, user);
      }
      return response.error(res, 404, 'Could not create Profile');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async createUser(req, res) {
    try {
      const user = await models.Users.create(req.body);
      if (user) {
        return response.success(res, 201, user);
      }
      return response.error(res, 400, 'Could not create Profile');
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  async loginUser(req, res) {
    const { username, password } = req.body;
    // TODO: check if the query is working.
    const user = await models.Users.findOne({
      where: { username }
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);

      return response.success(res, 201, {
        message: `${username} successfully logged in.`,
        token
      });
    }
    return response.error(res, 401, 'Invalid credentials');
  },

  async uploadUserImage(req, res, next) {
    const { params, file } = req;
    try {
      const user = await models.Users.update(
        { profile_picture: file.secure_url, public_id: file.public_id },
        { where: { username: params.username }, returning: true }
      );
      if (user) return response.success(res, 200, user);
      return response.error(res, 400, 'Image was not uploaded');
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
        req.userEmail.email
      );
      if (!sendMail) {
        return response.error(res, 400, 'Error sending mail try again');
      }
      const user = await models.Users.update(
        {
          resetPasswordToken: token,
          resetPasswordExpires: expiringDate
        },
        { where: { email: req.userEmail.email } }
      );
      if (user) {
        return response.success(
          res,
          200,
          `Email sent to ${req.userEmail.email}`
        );
      }
      return response.error(res, 400, 'User email error');
    } catch (error) {
      return next({ message: 'Error sending mail tryagain' });
    }
  },

  async resetPassword(req, res, next) {
    const { token } = req.query;
    try {
      const user = await models.Users.findOne({
        where: { resetPasswordToken: token },
        attributes: ['resetPasswordExpires', 'id']
      });
      if (!user) {
        return response.error(res, 401, 'Invalid token to reset password');
      }
      const savedDate = user.dataValues.resetPasswordExpires;
      const date = Date.now() - savedDate;
      if (date > 0) {
        return response.error(res, 400, 'Password reset have expired');
      }
      const newUserPassword = await models.Users.update(
        {
          password: req.body.password,
          // resetPasswordExpires: '',
          resetPasswordToken: ''
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
  }
};
