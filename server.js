const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get('/', (_, res) => {
  res.status(200).json('API endpoints exposed at /api');
});

module.exports = server;
