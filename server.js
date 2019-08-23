const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const apiRouter = require('./api');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api', apiRouter);

server.get('/', (_, res) => {
  res.status(200).json('API endpoints exposed at /api');
});

module.exports = server;
