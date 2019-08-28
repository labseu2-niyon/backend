const models = require('../../database/models');
const response = require('../helpers/response');

module.exports = {
  async getUserByUsername(req, res) {
    try {
      const { userName } = req.params;
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
      const users = await models.Users.findAll({ returning: true });
      return response.success(res, 201, users);
    } catch (error) {
      return response.error(res, 500, error.message);
    }
  },

  // async createUserProfile(req, res) {
  //   try {
  //     const user = await models.Users.create(req.body);
  //     if (user) {
  //       return response.success(res, 201, user);
  //     }
  //     return response.error(res, 404, 'Could not create Profile');
  //   } catch (error) {
  //     return response.error(res, 500, error.message);
  //   }
  // },

  async updateUserProfile(req, res, next) {
    try {
      const { userName } = req.params;
      const { firstName, lastName, eMail, bio, locationId } = req.body;
      const updateUser = await models.Users.update({
        first_name: firstName,
        last_name: lastName,
        email: eMail,
        biography: bio,
        location_id: locationId,
        where: { username: userName },
        returning: true
      });
      if (updateUser) return response.success(res, 200, updateUser);
      return response.error(res, 404, 'Could not update user');
    } catch (error) {
      console.log(error.message);
      return next({ message: 'Error updating profile' });
    }
  },

  async uploadUserImage(req, res, next) {
    const { params, file } = req;
    try {
      const user = await models.Users.update(
        { profile_picture: file.url, public_id: file.public_id },
        { where: { username: params.username }, returning: true }
      );
      if (user) return response.success(res, 200, user);
      return response.error(res, 400, 'Image was not uploaded');
    } catch (error) {
      return next({ message: 'Error updating image' });
    }
  }
};
