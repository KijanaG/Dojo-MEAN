const mongoose = require('mongoose');
const User = mongoose.model('User');
module.exports = {
    find: function(req, res) {
        User.find({}, function(err, users){
            if(err) {
                console.log("Error::: ", err);
                res.redirect('/');
            } else {
                for(var x in users){
                    console.log(JSON.stringify(users[x].createdAt));
                }
                console.log("Here they are: __::", users);
                users.reverse();
                res.render('quote',{users:users});
            }
        });
    },
    create: function(req, res) {
        console.log("POST DATA", req.body);
        var user = new User({name: req.body.name, quote:req.body.quote});
        user.save(function(err) {
            if(err) {
                console.log("Something went wrong", err);
                for(var key in err.errors){
                    req.flash('quotes', err.errors[key].message);
                }
                res.redirect('/');
            } else {
                console.log("Successfully added a user!")
                res.redirect('/quotes');
            }
        });
    }
};