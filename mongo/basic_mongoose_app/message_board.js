// Require the Express Module
var express = require('express');
//Require the Mongoose Module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/messages');
var CommentSchema = new mongoose.Schema({
    name: {type:String, required: [true,"must be filled"], minlength: [3,"Too few characters"]},
    comment: {type: String, required: [true, "must be filled out"], min: [4,"Message must be sufficient"]}
},{timestamps:true});
var MessageSchema = new mongoose.Schema({
    name: {type:String, required: [true,"Must be filled"], minlength: [3,"Too few characters"]},
    message: {type: String, required: [true,"Must be filled out"], min: [7,"Message must be sufficient"]},
    comments: [CommentSchema]
},{timestamps:true});
var Comment = mongoose.model('Comment', CommentSchema);
var Message = mongoose.model('Message', MessageSchema);
// var Comment = mongoose.model('Comment');
// var Message = mongoose.model('Message');
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
    Message.find({}, function(err, messages){
        if(err) {
            console.log("WHASSAAAA");
            for(var key in err.errors) {
                req.flash('messages', err.errors[key].message);
            }
            res.redirect('/');
        } else {
            messages.reverse();
            res.render('message_board', {things: messages});
        }
    })
    // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
})
// Add User Request 
app.post('/message/new', function(req, res) {
    var message = new Message(req.body);
    message.save(function(err) {
        if(err) {
            console.log("Something went wrong", err);
            for(var key in err.errors){
                req.flash('create', err.errors[key].message);
            }
            res.redirect('/');
        } else {
            console.log("Successfully added a message!")
            res.redirect('/');
        }
    });
    // This is where we would add the user from req.body to the database.
});
app.post('/comment/:id', function(req, res) {
    Message.findOneAndUpdate({_id:req.params.id}, {$push: {comments: req.body}}, function(err, message) {
        if(err) {
            console.log(err);
            for(var key in err.errors){
                req.flash('comm', err.errors[key].message);
            }
            res.redirect('/');
        } else {
            console.log("Successfully added comment");
            res.redirect('/');
        }
    })
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})