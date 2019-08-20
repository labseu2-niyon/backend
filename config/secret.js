require('dotenv').config();

module.exports = {
  DEV_DATABASE_URL: process.env.DEV_DATABASE_URL,
  DATABASE_URL_TEST: process.env.DATABASE_URL,
  DATABASE_URL: process.env.DATABASE_URL,
  DIALECT: process.env.DIALECT,
  POSTGRES_DB: process.env.POSTGRES_DB,
  POSTGRES_USER: process.env.POSTGRES_USER,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD
};
