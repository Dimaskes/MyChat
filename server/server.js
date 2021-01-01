const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const app = express();

const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));

const server = http.createServer(app);
const io = socketIO(server);

const messages = [];

io.sockets.on('connection', (socket) => {
  socket.emit('renderOldMessages', { ...messages });
  socket.on('sendMessage', (obj) => {
    const messageObj = {
      name: obj.name,
      msg: obj.msg,
      author: false,
    };
    messages.push(messageObj);

    socket.broadcast.emit('getMessage', messageObj);
    socket.emit('getMessage', {
      name: 'Вы',
      msg: obj.msg,
      author: true,
    });
  });
});

server.listen(3000, () => {
  console.log('Сервер запущен!');
});
