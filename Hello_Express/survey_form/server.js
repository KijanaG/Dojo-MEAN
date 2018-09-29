// require express
var express = require("express");
// path module -- try to figure out where and why we use this
var path = require("path");
var session = require("express-session");
// create the express appcopy
var app = express();
var bodyParser = require("body-parser");
app.use(session({
    secret:"tissecret",
    resave: false,
    saveUninitialized: true, 
    cookie: {maxAge: 60000}
    }))
// use it!
app.use(bodyParser.urlencoded({ extended: true }));
// static content
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
});
app.get('/display', function(req, res) {
    context = {name: req.session.name,
                location: req.session.location,
                language: req.session.language,
                message: req.session.message}
    res.render("result", {user: context});
});
// post route for adding a user
app.post('/results', function(req, res) {
    console.log("POST DATA", req.body);
    req.session.name = req.body.name;
    req.session.location = req.body.location;
    req.session.language = req.body.language;
    req.session.message = req.body.message;
 // This is where we would add the user to the database
 // Then redirect to the root route
 res.redirect('/display');
});
// tell the express app to listen on port 8000
app.listen(8000, function() {
 console.log("listening on port 8000");
});