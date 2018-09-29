// require express
var express = require("express");

var path = require("path");
var session = require("express-session");
const axios = require("axios");
var app = express();
var bodyParser = require("body-parser");


app.use(bodyParser.urlencoded({ extended: true }));


app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
 res.render("index");
});

app.get('/people', function(req, res) {
    axios.get('https://swapi.co/api/people/')
    .then(data => {
        console.log("DATA::::", data.data);
        res.json(data.data);
    })
    .catch(error => {
        console.log(error);
        res.json(error);
    })
});
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});