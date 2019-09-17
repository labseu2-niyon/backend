require('dotenv').config();
const http = require('http');
const io = require('socket.io');
const app = require('./server');
const socketIO = require('./api/chats/chat');

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);

const sockets = io.listen(server);

socketIO.chats(sockets);

server.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
