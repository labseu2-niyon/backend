require('dotenv').config();
const Sequelize = require('sequelize');

// env from .env
// const development = `
// postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_DATABASE}`;

// env set on heroku/circleCI/AWS  => DATABASE_URL
// const dbUrl = process.env.DATABASE_URL
//   ? `${process.env.DATABASE_URL}?ssl=true`
//   : development;

const db = new Sequelize(
  'population-m-s-test',
  'postgres',
  'postgres',
  'postgres'
);

module.exports = db;
