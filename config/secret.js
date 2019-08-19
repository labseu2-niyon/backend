require('dotenv').config();

module.exports = {
  DEV_DATABASE_URL: process.env.DEV_DATABASE_URL,
  TEST_DATABASE_URL: process.env.TEST_DATABASE_URL,
  DATABASE_URL: process.env.DATABASE_URL
};
