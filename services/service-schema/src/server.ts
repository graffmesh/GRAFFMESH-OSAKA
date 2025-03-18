import { Server } from 'socket.io';

import { createServer } from 'http';

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('new-annotation', (data) => {
    socket.broadcast.emit('update-annotations', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});
