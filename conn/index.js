require('dotenv').config();
const Sequelize = require('sequelize');

const db = new Sequelize(`
postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:5432/${process.env.DB_DATABASE}`);

module.exports = db;
