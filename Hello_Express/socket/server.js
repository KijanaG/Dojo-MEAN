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
app.get('/people', function(req, res) {
    console.log("HELLLOOOOO");
    res.render("game");
});


io.on('connection', function (socket) { //2 
  socket.on('now_playing', function(data) {
      console.log("0000000000");
    axios.get('https://opentdb.com/api.php?amount=10&category=21')
      .then(data => {
          console.log("DATA::::", data.data.results[0]);
          const question = data.data.results[0];
        io.emit('update',{data: question});
      })
      .catch(error => {
          console.log(error);
        //   res.json(error);
      })
      socket.on('answer', function(data){
        if(data.answer == data.correct){
        io.emit('own');
        }
        else{
            io.emit('your');
        }
        // console.log(question);
      //   if(data.answer == data.data.results[i].correct )
    })
  })
});
