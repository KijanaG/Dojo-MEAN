// Require the Express Module
var express = require('express');
//Require the Mongoose Module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/authors');
var AuthorSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: [3,"Too few characters"]},
},{timestamps:true});
mongoose.model('Author', AuthorSchema);
var Author = mongoose.model('Author');
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
// Require path
// var path = require('path');
// Routes
// Root Request
app.get('/authors', function(req, res) {
    Author.find({}, function(err, authors){
        if(err) {
            console.log("Error", err);
            res.json({message:"Error", error:err});
        } else {
            console.log("Truth**",authors);
            res.json({message: "Success", authors: authors});
        }
    });
});
app.get('/authors/:id', function(req, res) {
    Author.find({_id:req.params.id}, function(err, author) {
        if(err) {
            console.log(err);
            res.json({message: "Error", error:err})
        } else {
            res.json({message: "Success",author:author})
        }
    });
});
app.post('/authors', function(req, res) {
    console.log("HOOWOOWOWOWJWJWJOWJ\n\n\n");
    console.log(req.body);
    var author = new Author({name:req.body.name});
    author.save(function(err) {
        if(err) {
            console.log(err);
            res.json({message: "Error",error:err});
        } else {
            Author.find({}, function(err, authors) {
                if(err){
                    console.log(err);
                    res.json({message: "Error",error:err});  
                } else {
                    console.log("Truth**",authors);
                    res.json({message: "Success", authors: authors});
                }
            });
        }
    });
});
app.put('/authors/:id', function(req, res) {
    console.log("YESYES",req.body.name);
    if(req.body.name.length < 3){
        console.log("NOOOOO")
        res.json({message:"Error", error:"Too few characters."});
    } else {
        Author.findOneAndUpdate({_id:req.params.id},{name:req.body.name}, function(err, author) {
            if(err) {
                console.log(err);
                console.log("WWWHAHHAHSASASSAAP\n\n");
                res.json({message: "Error",error:err});
            } else {
                author.save(function(err,author) {
                    if(err) {
                        console.log(err);
                        res.json({message: "Error",error:err});
                } else {
                    Author.find({}, function(err, authors) {
                        if(err){
                            console.log(err);
                            res.json({message: "Error",error:err});  
                        } else {
                            console.log("Truth**",authors);
                            res.json({message: "Success", authors: authors});
                        }
                    });
                }
            });
        }
        });
    }
});
app.delete('/authors/:id', function(req, res) {
    Author.remove({_id:req.params.id}, function(err, author) {
        if(err) {
            console.log(err);
            res.json({message: "Error", error:err})
        } else {
            Author.find({}, function(err, authors) {
                if(err) {
                    console.log(err);
                    res.json({message: "Error", error:err})
                } else {
                    console.log("Success");
                    res.json({message: "Success", authors: authors})
                }
            });
        }
    });
});
app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('./public/dist/public/index.html'))
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})