// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
// var session = require('express-session');
// const flash = require('express-flash');
// app.use(flash());
// app.use(session({ cookie:{maxAge:60000},
//     secret: "secret_key",
//     resave: false,
//     saveUninitialized: false}));
// app.use(session());
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist/public'));
console.log("Step 3");
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
// Require path
// var path = require('path');
// Routes
// Root Request
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})