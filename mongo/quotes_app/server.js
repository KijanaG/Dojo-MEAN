// Require the Express Module
var express = require('express');
// Create an Express App
var app = express();
var session = require('express-session');
const flash = require('express-flash');
app.use(flash());
app.use(session({ cookie:{maxAge:60000},
    secret: "secret_key",
    resave: false,
    saveUninitialized: false}));
// app.use(session());
// Require body-parser (to receive post data from clients)
var bodyParser = require('body-parser');
// Integrate body-parser with our App
app.use(bodyParser.urlencoded({ extended: true }));
// Require path
var path = require('path');
// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './static')));
// Setting our Views Folder Directory
app.set('views', path.join(__dirname, './views'));
// Setting our View Engine set to EJS
app.set('view engine', 'ejs');
// Import Routes
require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})