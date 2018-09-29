// Require the Express Module
var express = require('express');
//Require the Mongoose Module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/tasks');
var TaskSchema = new mongoose.Schema({
    title: {type:String, required: true, minlength: [4,"Too few characters"]},
    description:{type:String, required: true, minlength:[7, "Too few characters."], default:""},
    completed:{type: Boolean, default:false}
},{timestamps:true});
mongoose.model('Task', TaskSchema);
var Task = mongoose.model('Task');
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
app.get('/tasks', function(req, res) {
    Task.find({}, function(err, tasks){
        if(err) {
            console.log("Error", err);
            res.json({message:"Error", error:err});
        } else {
            console.log("Truth**",tasks);
            res.json({message: "Success", tasks: tasks});
        }
    });
});
app.get('/tasks/:id', function(req, res) {
    Task.find({_id:req.params.id}, function(err, task) {
        if(err) {
            console.log(err);
            res.json({message: "Error", error:err})
        } else {
            res.json({message: "Success",task:task})
        }
    });
});
app.post('/tasks', function(req, res) {
    console.log("HOOWOOWOWOWJWJWJOWJ\n\n\n");
    console.log(req.body);
    var task = new Task({title:req.body.title, description:req.body.description,completed:req.body.completed});
    task.save(function(err) {
        if(err) {
            console.log(err);
            res.json({message: "Error",error:err});
        } else {
            Task.find({}, function(err, tasks) {
                if(err){
                    console.log(err);
                    res.json({message: "Error",error:err});  
                } else {
                    console.log("Truth**",tasks);
                    res.json({message: "Success", tasks: tasks});
                }
            });
        }
    });
});
app.put('/tasks/:id', function(req, res) {
    Task.findOneAndUpdate({_id:req.params.id},{title:req.body.title,description:req.body.description}, function(err, task) {
        if(err) {
            console.log(err);
            res.json({message: "Error",error:err});
        } else {
            task.save(function(err,task) {
                if(err) {
                    console.log(err);
                    res.json({message: "Error",error:err});
            } else {
                Task.find({}, function(err, tasks) {
                    if(err){
                        console.log(err);
                        res.json({message: "Error",error:err});  
                    } else {
                        console.log("Truth**",tasks);
                        res.json({message: "Success", tasks: tasks});
                    }
                });
            }
        });
    }
    });
});
app.delete('/tasks/:id', function(req, res) {
    Task.remove({_id:req.params.id}, function(err, task) {
        if(err) {
            console.log(err);
            res.json({message: "Error", error:err})
        } else {
            Task.find({}, function(err, tasks) {
                if(err) {
                    console.log(err);
                    res.json({message: "Error", error:err})
                } else {
                    console.log("Success");
                    res.json({message: "Success", tasks: tasks})
                }
            });
        }
    });
});
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})