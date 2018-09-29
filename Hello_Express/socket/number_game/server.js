const express = require('express');
var path = require("path");
const app = express();
const axios = require("axios");
app.use(express.static(__dirname + "/public"));
const server = app.listen(1337);
const io = require('socket.io')(server);
var counter = 0;
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("index");
});

io.on('connection', function (socket) { //2 
  socket.emit('greeting', { msg: 'Greetings, from server Node, brought to you by Sockets! -Server' }); //3
  socket.on('thankyou', function (data) { //7
    console.log(data.msg); //8 (note: this log will be on your server's terminal)
  });
  socket.on('now_playing', function(data) {
    axios.get('https://swapi.co/api/people/')
      .then(data => {
          console.log("DATA::::", data.data);
          res.json(data.data);
      })
      .catch(error => {
          console.log(error);
          res.json(error);
      })
  io.emit('updated_message',{count: counter});
  })
  socket.on('resetting', function(data) {
    counter = 0;
    io.emit('updated_message', {count:counter});
  })
});
