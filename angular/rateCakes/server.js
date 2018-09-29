// Require the Express Module
var express = require('express');
//Require the Mongoose Module
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/cakes');
var RatingSchema = new mongoose.Schema({
    stars:{type:Number, required: true},
    comment:{type:String, required:true}
},{timestamps:true});
var CakeSchema = new mongoose.Schema({
    baker: {type:String, required: true, minlength: [3,"Too few characters"]},
    image:{type:String, required: true, minlength:[7, "Too few characters."]},
    rating:[RatingSchema]
},{timestamps:true});
mongoose.model('Rating', RatingSchema);
mongoose.model('Cake', CakeSchema);
var Cake = mongoose.model('Cake');
var Rating = mongoose.model('Rating');
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
app.get('/cakes', function(req, res) {
    Cake.find({}, function(err, cakes){
        if(err) {
            console.log("Error", err);
            res.json({message:"Error", error:err});
        } else {
            console.log("**CAKES**",cakes);
            res.json({message: "Success", cakes: cakes});
        }
    });
});
app.get('/cakes/:id', function(req, res) {
    Cake.find({_id:req.params.id}, function(err, cake) {
        if(err) {
            console.log(err);
            res.json({message: "Error", error:err})
        } else {
            res.json({message: "Success",cake:cake})
        }
    });
});
app.post('/cakes', function(req, res) {
    console.log("HOOWOOWOWOWJWJWJOWJ\n\n");
    console.log(req.body);
    var cake = new Cake({baker:req.body.baker, image:req.body.image});
    cake.save(function(err) {
        if(err) {
            console.log(err);
            res.json({message: "Error",error:err});
        } else {
            Cake.find({}, function(err, cakes) {
                if(err){
                    console.log(err);
                    res.json({message: "Error",error:err});  
                } else {
                    // console.log("Truth**",cakes);
                    res.json({message: "Success", cakes: cakes});
                }
            });
        }
    });
});
app.post('/ratings/:id', function(req, res) {
    console.log("SERVERSERVER:: ", req.body);
    Cake.findOneAndUpdate({_id:req.params.id},{$push:{rating:req.body}},function(err){
        if(err){
            console.log(err);
            res.json({message:"Error",Error:err});
        } else {
           Cake.find({_id:req.params.id}, function(err, cake) {
               if(err){
                   console.log("ERROR");
                   res.json({Error:err})
               } else {
                   console.log("Success");
                   res.json({message: "Success", cake:cake})
               }
           })
        }
    });
});
// app.put('/cakes/:id', function(req, res) {
//     Task.findOneAndUpdate({_id:req.params.id},{title:req.body.title,description:req.body.description}, function(err, task) {
//         if(err) {
//             console.log(err);
//             res.json({message: "Error",error:err});
//         } else {
//             task.save(function(err,task) {
//                 if(err) {
//                     console.log(err);
//                     res.json({message: "Error",error:err});
//             } else {
//                 Task.find({}, function(err, tasks) {
//                     if(err){
//                         console.log(err);
//                         res.json({message: "Error",error:err});  
//                     } else {
//                         console.log("Truth**",tasks);
//                         res.json({message: "Success", tasks: tasks});
//                     }
//                 });
//             }
//         });
//     }
//     });
// });
// app.delete('/tasks/:id', function(req, res) {
//     Task.remove({_id:req.params.id}, function(err, task) {
//         if(err) {
//             console.log(err);
//             res.json({message: "Error", error:err})
//         } else {
//             Task.find({}, function(err, tasks) {
//                 if(err) {
//                     console.log(err);
//                     res.json({message: "Error", error:err})
//                 } else {
//                     console.log("Success");
//                     res.json({message: "Success", tasks: tasks})
//                 }
//             });
//         }
//     });
// });
// Setting our Server to Listen on Port: 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})