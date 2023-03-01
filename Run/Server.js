const express = require('express');
const {createServer} = require('http') //using for realtime it is require from browser
const {Server} = require('socket.io')

const app  = express();
const httpServer = createServer(app);
const io = new Server(httpServer,{
        cors: {
                origin : "http://localhost:5173"
        }
})
io.on("connection",(socket)=>{  //if any join the server it will be alert 
        console.log("Id : " + socket.id);
        socket.on('sent_message',data=>{
                console.log(data);
                socket.to(data.toid).emit('recv_message',data);
        });
        socket.on("disconnect",()=>{
                console.log("user id : " + socket.id + " => disconnect");
        });

});

httpServer.listen(3001,()=>{
        console.log("port is open on 3001")
});


