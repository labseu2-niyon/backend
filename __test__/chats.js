const clientSocket = require('socket.io-client');
const http = require('http');
const serverSocket = require('socket.io');
const { chats } = require('../api/chats/chat');
const server = require('../server');

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

// describe('Create server and connect ws', () => {
beforeAll(done => {
  httpServer = http.createServer().listen(server);
  httpServerAddr = httpServer.address();
  // console.log(httpServerAddr);
  ioServer = serverSocket(httpServer);
  done();
});
// });

// describe('Close server', () => {
afterAll(done => {
  ioServer.close();
  httpServer.close();
  done();
});
// // });

// // describe('Run a socket connection before Each test', () => {
beforeEach(done => {
  socket = clientSocket.connect(
    `http://[${httpServerAddr.address}]:${httpServerAddr.port}`,
    {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
      transports: ['websocket'],
      query: {
        id: 1
      }
    }
  );
  chats(ioServer);
  socket.on('connect', () => {
    done();
  });
});
// // });

// // describe('Close a socket Connection after each test', () => {
afterEach(done => {
  if (socket.connected) {
    socket.disconnect();
  }
  done();
});
// // });

// describe('Connection', () => {
it('should return lists of connected users', async () => {
  // console.log(socket);
  chats(ioServer);
  socket.on('connectionList', users => {
    console.log(users);
  });
});
// });
