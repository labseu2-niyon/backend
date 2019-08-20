const secret = require('../../config/secret');

module.exports = {
  development: {
    url: secret.DEV_DATABASE_URL,
    dialect: 'postgres'
  },
  test: {
    username: secret.POSTGRES_USER,
    password: secret.POSTGRES_PASSWORD,
    database: secret.POSTGRES_DB,
    host: secret.PGHOST,
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
