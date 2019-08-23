module.exports = {
  success(res, status, data) {
    return res.status(status).json({
      status,
      data
    });
  },

  error(res, status, message) {
    return res.status(status).json({
      status,
      message
    });
  }
};
