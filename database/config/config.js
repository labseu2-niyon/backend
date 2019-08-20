const secret = require('../../config/secret');

module.exports = {
  development: {
    url: secret.DEV_DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    database: 'population-m-s-test',
    username: 'postgres',
    password: 'postgres',
    dialect: 'postgres'
  },
  staging: {
    url: secret.DATABASE_URL,
    dialect: 'postgres'
  },
  production: {
    url: secret.DATABASE_URL,
    dialect: 'postgres'
  }
};
