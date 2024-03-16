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

//Each room player counter
const roomPlayerCount = {};

 // handle requests to server
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('sendEmail', (email) => {
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

    // set/ initialize a counter if one does not exist for the room already 
    if (!roomPlayerCount[roomId]){
      roomPlayerCount[roomId] =0;
    }
  });

  socket.on('chatMessage', (data) => {
    console.log(data.room)
    console.log(data.text);
    io.to(data.room).emit('message', `${socket.id.substring(0,5)}: ${data.text}`);
  });

  // Count how many players are ready in a game room
  socket.on('playerReady', (roomId) =>{
    // If a player clicks "Player Ready?", increment count of players that are ready
    roomPlayerCount[roomId] =  roomPlayerCount[roomId] + 1
    console.log(`User pressed button in ${roomId} roomPlayerCount[roomId] ${roomPlayerCount[roomId]}` );
    // Once the number of ready players = 4, reset the counter and indicate that all players are ready
    if (roomPlayerCount[roomId] === 4){
      io.to(roomId).emit("allPlayersReady")
      roomPlayerCount[roomId] = 0
    }
  })

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    console.log(`User left room ${roomId}`);
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
