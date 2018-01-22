const http     = require('http');
const express  = require('express');
const socketIO = require('socket.io');
const path     = require('path');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '/../public');

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

//
// Middleware: Serve static content from the 'public' dir
//
app.use(express.static(publicPath));

// Register event listener
io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    sender: 'Admin',
    text: 'Welcome to the chat channel! Keep it clean, yo.',
    createdAt: Date.now()});

  socket.broadcast.emit('newMessage', {
    sender: 'Admin',
    text: 'A new user has joined the chat room.',
    createdAt: Date.now()});

  socket.on('createMessage', (body) => {
    console.log('Received new message');

    // // Sends to everyone -- note call on io and not socket
    // io.emit('newMessage', {
    //   sender: body.sender,
    //   text: body.text,
    //   createdAt: Date.now()});

    // Sends to everyone except this socket
    socket.broadcast.emit('newMessage', {
      sender: body.sender,
      text: body.text,
      createdAt: Date.now()});

  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');

    io.emit('newMessage', {
      sender: 'Admin',
      text: 'A user has left the chat room.',
      createdAt: Date.now()});
  });
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
