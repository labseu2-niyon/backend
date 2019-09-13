require('dotenv').config();
const http = require('http');
const io = require('socket.io');
const app = require('./server');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

module.exports = io.listen(server);

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
