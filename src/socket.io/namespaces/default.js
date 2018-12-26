const SendMessageEventEmitter = require('../../events/SendMessageEventEmitter');

module.exports = io => {
  io.sockets.on('connection', socket => {
    const { id, nsp } = socket;
    console.log(`[ID=${id}, NAMESPACE=${nsp.name}] connected.`);
    socket.on('message::fromClient', message => {
      console.log('/ -> ' + message);
      socket.broadcast.emit('message::fromServer', message);
    });

    socket.on('disconnect', reason => {
      console.log(`[ID=${id}, NAMESPACE=${nsp.name}] disconnected. (${reason})`);
    });
  });

  SendMessageEventEmitter.on('event::send', (payload) => {
    io.of('/').emit('message::fromServer', payload);
  });

  SendMessageEventEmitter.on('event::clear', (payload) => {
    io.of('/').emit('clear::fromServer', payload);
  });
};
