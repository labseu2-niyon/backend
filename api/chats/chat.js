const io = require('../../index');

io.on('connection', socket => {
  console.log(`socket ${socket.id} is connected`);
  socket.emit('connected', { text: 'Hello Delba and Sorin' });
});
