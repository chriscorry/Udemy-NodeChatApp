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


  socket.on('createMessage', (body) => {
    console.log('Received new message');

    io.emit('newMessage', {
      sender: body.sender,
      text: body.text,
      createdAt: Date.now()});
  });

  socket.on('disconnect', (socket) => {
    console.log('User disconnected');
  });
});


server.listen(port, () => {
  console.log(`Server is up on port ${port}.`);
});
