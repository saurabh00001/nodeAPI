const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors'); // Import the cors middleware
const con = require('./connection');
const app = express();
const server = http.createServer(app);
const io = socketIo(server,{
    cors: {
      origin: "http://localhost:8100",
      methods: ["GET", "POST"]
    }
});

// Use cors middleware to enable CORS
app.use(cors());
const activeUsers = new Set();

var users = [];
io.on('connection', (socket) => {
  
  // activeUsers.add(socket.id);
  // io.emit('activeUsers', Array.from(activeUsers));
  // Handle events from the client
  console.log('A user connected with  id : ' + socket.id);

  socket.on('connected', (senderId, recipientId) => {
    if(senderId > recipientId){
      roomName = senderId+'-'+recipientId;
    }else{
      roomName = recipientId + '-' + senderId;
    }
    socket.join(roomName);
    console.log(`Socket ${socket.id} is connected room with ${roomName}`);
    
  });

  socket.on('chat message', (roomName, message) => {
    // Broadcast the message to all clients in the specified room
    console.log(`Message from room name ${roomName}: ${message}`);
    io.to(roomName).emit('chat message', message);
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });


});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Chat Server running on http://localhost:${PORT}`);
});