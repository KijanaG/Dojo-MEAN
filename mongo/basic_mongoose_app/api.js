// Require the Express Module
var express = require('express');
//Require the Mongoose Module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/people');
var PersonSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: [3,"Too few characters"]}
},{timestamps:true});
mongoose.model('Person', PersonSchema);
var Person = mongoose.model('Person');
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
// Require path
// var path = require('path');
// Routes
// Root Request
app.get('/', function(req, res) {
    Person.find({}, function(err, people){
        if(err) {
            console.log("Error", err);
            res.json({message:"Error", error:err});
        } else {
            console.log("Truth**",people);
            res.json({message: "Success", people: people});
        }
    });
});

app.get('/new/:name', function(req, res) {
    console.log("Name: ", req.params.name);
    var person = new Person({name: req.params.name});
    person.save(function(err) {
        if(err) {
            console.log(err);
            res.json({message: "Error",error:err});
        } else {
            Person.find({}, function(err, people) {
                if(err){
                    console.log(err);
                    res.json({message: "Error",error:err});  
                } else {
                    console.log("Truth**",people);
                    res.json({message: "Success", people: people});
                }
            });
        }
    });
});
app.get('/remove/:name', function(req, res) {
    console.log("Name: ", req.params.name);
    Person.remove({name:req.params.name}, function(err){
        if(err) {
            console.log(err);
            res.json({message: "Error",error:err});
        } else {
            Person.find({}, function(err, people) {
                if(err){
                    console.log(err);
                    res.json({message: "Error",error:err});  
                } else {
                    console.log("Truth**",people);
                    res.json({message: "Success", people: people});
                }
            });
        }
    });
});
app.get('/:name', function(req, res) {
    console.log("Name: ", req.params.name);
    Person.find({name:req.params.name}, function(err, person) {
        if(err) {
            console.log(err);
            res.json({message: "Error", error:err})
        } else {
            console.log("Success");
            res.json({message: "Success", person: person});
        }
    });
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})