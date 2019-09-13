module.exports = {
  chats(sockets) {
    sockets.on('connection', socket => {
      console.log(socket.id, 'from here');
      socket.emit('Delba', { text: 'Hello Sorin' });
      socket.on('chatOpen', () => {
        // fetch their chat history
      });
    });
  }
};
