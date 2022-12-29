import express from 'express';
import path from 'path';
import http from 'http';
import { Server } from 'socket.io';

const PORT = 3000;
const app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, '/public')));
app.get('/', (_, res) => res.render('home'));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

/* Websocket */
wsServer.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    const roomName = data.payload;
    socket.join(roomName);
    socket.to(roomName).emit('welcome');
  });

  socket.on('offer', (offer, roomName) => {
    socket.to(roomName).emit('offer', offer);
  });

  socket.on('answer', (answer, roomName) => {
    socket.to(roomName).emit('answer', answer);
  });

  socket.on('ice', (ice, roomName) => {
    socket.to(roomName).emit('ice', ice);
  });
});

const listenHandler = () => {
  console.log(`Listen on ${PORT}`);
};

wsServer.on('connection', () => console.log('wsServerOn'));
httpServer.listen(PORT, listenHandler);
