// Require the Express Module
var express = require('express');
//Require the Mongoose Module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users');
var UserSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: [6,"Too few characters"]},
    age: {type: Number, required: true, max:[3,"Age is too high"]}
},{timestamps:true});
mongoose.model('User', UserSchema);
var User = mongoose.model('User');
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
// Routes
// Root Request
app.get('/', function(req, res) {
    User.find({}, function(err, users){
        if(err) {
            console.log("Error");
            res.redirect('/');
        } else {
            console.log("Truth**",users);
            res.render('index', {users: users});
        }
    })
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
})
// Add User Request 
app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);
    var user = new User({name: req.body.name, age:req.body.age});
    user.save(function(err) {
        if(err) {
            console.log("Something went wrong", err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            res.redirect('/');
        } else {
            console.log("Successfully added a user!")
            res.redirect('/');
        }
    });
    // This is where we would add the user from req.body to the database.
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})