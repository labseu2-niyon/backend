const express = require('express');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const logger = require('morgan');
const apiRouter = require('./api');
// const keys = require('./config/secret');
// const jwt = require('./api/helpers/jwt');
const github = require('./api/middleware/authStrategies');

const server = express();

server.use(helmet());
server.use(cors());
server.use(logger('dev'));
server.use(express.json());

server.use(passport.initialize());
server.use('/api', apiRouter);
passport.use(github.githubStrategy());

server.get('/', async (_, res) => {
  // const user = {
  //   id: 1,
  //   username: 'john'
  // };
  // const token = await jwt.generateToken(user);
  res.status(200).json(`API endpoints exposed at /api`);
});

server.all('*', (req, res) => {
  res.status(404).json({
    message: "This endpoint doesn't exists"
  });
});

// eslint-disable-next-line no-unused-vars
server.use(function errors(err, req, res, next) {
  if (err.message === 'An unknown file format not allowed') {
    return res.status(400).json({ message: 'File type must be jpg or png' });
  }
  return res.status(500).json({ err });
});

module.exports = server;
