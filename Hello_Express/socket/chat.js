const express = require('express');
var path = require('path');
const app = express();
// const axios = require('axios');
var session = require('express-session')({
    secret: "yolo_key",
    resave: true,
    saveUninitialized: true
});
var sharedsession = require('express-socket.io-session');
app.use(session);
app.use(express.static(__dirname + "/public"));
const server = app.listen(1337);
const io = require('socket.io')(server);
io.use(sharedsession(session,{
    autosave: true
}));
app.set('views', path.join(__dirname, "./views"));
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    res.render("chat");
})
app.get('/chat', function(req, res){
    res.render("old");
})

var chatroom = [];
io.on('connection', function(socket){
    
    socket.on('new_user', function(data){
        chatroom.push(data.name);
        console.log(chatroom);
        // var destination = '/chat';
        // socket.handshake.session.chat = chatroom;
        // socket.handshake.session.save();
        // var globe = socket.handshake.session.chat;
        // io.emit('greeting', { people: 'Greetings' });
        io.emit('updateAllClients', {data : chatroom});
    });
    socket.on('disconnect', function(){
        socket.emit('disconnected');
    })
    socket.on('delete', function(data){
        console.log("DELETE", data);
    })
});