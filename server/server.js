const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketIO(server);

io.sockets.on('connection', (socket) => {
  console.log('hello', socket);
});

server.listen(3000, () => {
  console.log('Сервер запущен!');
});
