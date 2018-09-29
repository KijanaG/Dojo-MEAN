//Require the Mongoose Module
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/users');
var UserSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: [5,"Too few characters"]},
    quote: {type: String, required: true, min:[5,"Quote is too short"]}
    },{timestamps:true});
mongoose.model('User', UserSchema);