import { io } from './http';

io.on('connection', socket => {
  if (socket.handshake.query.module && socket.handshake.query.contractId) {
    socket.join(
      `${socket.handshake.query.module}_${socket.handshake.query.contractId}`,
    );
  }

  socket.on('disconnect', () => {
    console.log('desconectar');
  });
});
