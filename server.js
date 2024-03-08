const { sendEmail } = require('./src/Mailjet.js');

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

 // handle requests to server
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('Generate Room', () => {
    const roomId = Math.random().toString(36).substring(2, 7);
    const roomLink = `http://localhost:3000/GameRoom/${roomId}`;
    socket.emit('newRoomLink', roomLink);

    // proof of concept
    const email = 'arjurek1029@gmail.com';
    const link = 'http://localhost:3000'
    sendEmail(email, link);
  });

  socket.on('joinRoom', async (roomId) => {
    socket.join(roomId);
    console.log(`User joined room ${roomId}`);
    // Notify room when someone joins
    socket.to(roomId).emit('message', `User ${socket.id.substring(0, 5)} has joined the room.`);
    const connections = await io.in(roomId).fetchSockets();
    var Ids = [];
    connections.forEach(function (connection) {
        Ids.push(connection.id.substring(0,5));
    });
    console.log(Ids)
    io.to(socket.id).emit('message', `User/s in room: ${Ids.toString()}`);
  });

  socket.on('chatMessage', (data) => {
    console.log(data.room)
    console.log(data.text);
    io.to(data.room).emit('message', `${socket.id.substring(0,5)}: ${data.text}`);
});

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room ${roomId}`);
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
