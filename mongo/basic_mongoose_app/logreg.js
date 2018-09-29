// Require the Express Module
var express = require('express');
//Require the Mongoose Module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/login');
//Define Schema
var UserSchema = new mongoose.Schema({
    first_name: {type:String},
    last_name: {type:String},
    hash: {type: String},
    email: {type: String},
    birthdate: {type:String}
},{timestamps:true});
var User = mongoose.model('User', UserSchema);
//Use express & Require Modules
var app = express();
var session = require('express-session');
const flash = require('express-flash');
const bcrypt = require('bcryptjs');
app.use(flash());
app.use(session({ cookie:{maxAge:100000},
    secret: "secret_key",
    resave: true,
    saveUninitialized: false}));
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
    console.log("MAIN EMAIL IN SESSION",req.session.email);
    if(req.session.email){
        req.session.email = null;
        res.redirect('/');
    } else {
        res.render("logreg");
    }
});
// Add User Request 
app.post('/login', function(req, res) {
    console.log(req.body);
    User.find({email:req.body.email}, function(err,user) {
        if(user ==0) {
            req.flash('login', "Cannot be logged in.");
            return res.redirect('/');
        } else {
            console.log(user);
            var hash = user[0].hash;
            if(bcrypt.compareSync(req.body.password, hash)){
                req.session.email = req.body.email;
                return res.redirect('/main');
            } else {
                req.flash('login', "Cannot be logged in.");
                return res.redirect('/');
            }
        }
    });
});
app.post('/registration', function(req, res) {
    var date = req.body.birthdate;
    console.log("REG",date[0], date[1]);
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(req.body.first_name.length == 0 || req.body.last_name.length == 0 || req.body.email.length == 0 || req.body.password.length == 0) {
        req.flash('registration', "All fields must be filled out");
        res.redirect('/');
    }
    else if(req.body.first_name.length < 3 || req.body.last_name.length < 3) {
        req.flash('name', "Name needs to be at least 3 characters long.");
        res.redirect('/');
    } else if(req.body.password.length < 8 || req.body.confirm.length < 8) {
        req.flash('password', "Password must be at least 8 characters long.");
        res.redirect('/');
    } else if(req.body.password != req.body.confirm) {
        req.flash('password', "Passwords must match.");
        res.redirect('/');
    } else if(!re.test(req.body.email)) {
        req.flash('email', 'Please provde a valid email adress')
        res.redirect('/');
    } else if(date[0] != 1 || date[0] != 2 ) {
        req.flash('bday', 'Please provde a valid birthdate')
        res.redirect('/');
    } else {
        console.log("WHYHTOUGHWHYHYHYHHY");
        User.find({email:req.body.email}, function(err, user) {
            if(user.length > 0) {
                console.log("USERTAKEN: ", user)
                req.flash('email', 'Email already taken.')
                return res.redirect('/');
            } else {
                console.log("YEW");
                var hash = bcrypt.hashSync(req.body.password, 10);
                console.log("HASH",hash);
                var newUser = new User({first_name:req.body.first_name,last_name:req.body.last_name,email:req.body.email,hash:hash});
                console.log("NEWUSER",newUser);
                newUser.save(function(err) {
                    if(err) {
                        console.log("Something went wrong: ", err);
                        for(var key in err.errors){
                            req.flash('registration', err.errors[key].message);
                        }
                        return res.redirect('/');
                    } else {
                        req.session.email = newUser.email;
                        return res.redirect('/main');
                    }
                });
            }
        });
    }
});
app.get('/main', function(req, res){
    User.find({email:req.session.email}, function(err,user) {
        if(err) {
            console.log(err);
            for(var key in err.errors){
                req.flash('registration', err.errors[key].message);
            }
            return res.redirect('/');
        } else {
            res.render("main", {user: user});
        }
    });
})
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})