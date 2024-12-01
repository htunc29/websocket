const express = require('express');
const { createServer } = require('node:http');
const { join } = require('node:path');
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server);

let activeusers=0;

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});
io.on('connection', (socket) => {

    
    if(socket.connected){
        io.emit("newuser",socket.id);
        activeusers++;
        io.emit("usercount",activeusers)
    }
    socket.on("disconnect",()=>{
        activeusers--;
        io.emit("usercount",activeusers);
    })
    socket.on('chat message', (username,message) => {
        io.emit('chat message',username,message);
      });
    socket.on("typing",(username)=>{
        io.emit("typing",username)
    })
    
    
  });

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});