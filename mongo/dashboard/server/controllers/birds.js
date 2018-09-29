const mongoose = require('mongoose');
const Bird = mongoose.model("Bird");
module.exports = {
    showAll: function(req, res) {
        Bird.find({}, function(err, birds) {
            if(err) {
                console.log("Errors: ", err);
                res.redirect("/");
            } else {
                console.log(birds);
                res.render('dashboard', {birds:birds});
            }
        })
    },
    showOne : function(req, res) {
        console.log(req.params.id);
        Bird.find({_id:req.params.id}, function(err, bird){
            if(err) {
                console.log("Error: ", err);
                res.redirect('/');
            } else {
                console.log("Here it is: ", bird);
                res.render('indiv_dash',{bird:bird});
            }
        });
    },
    addBird: function(req, res) {
        console.log("POST DATA", req.body);
        var bird = new Bird({name: req.body.name, color:req.body.color, type:req.body.type});
        bird.save(function(err) {
            if(err) {
                console.log("Something went wrong", err);
                for(var key in err.errors){
                    req.flash('form', err.errors[key].message);
                }
                res.redirect('/bird/new');
            } else {
                console.log("Successfully added a bird!")
                res.redirect('/');
            }
        });
    },
    displayEdit: function(req, res) {
        Bird.find({_id:req.params.id}, function(err, bird){
            if(err) {
                console.log("Error: ", err);
                res.redirect('/');
            } else {
                console.log("EDIT: ", bird);
                res.render('indiv_edit',{bird:bird});
            }
        });
    },
    editBird: function(req, res) {
        console.log("TIME TO EDIT**");
        console.log("^*&*^**$*",req.params.id);
        Bird.update({_id:req.params.id},{name:req.body.name, type:req.body.type,color:req.body.color}, function(err, bird){
            if(err) {
                console.log("ErrrrrrrrOOORRRR",err);
                res.redirect('/');
            } else {
                res.redirect('/birds/edit/'+req.params.id);
            }
        });
    },
    deleteBird: function(req, res) {
        Bird.remove({_id:req.params.id}, function(err){
            if(err){
                console.log(err);
                res.redirect('/');
            } else {
                console.log("Success");
                res.redirect('/')
            }
        });
    }
}