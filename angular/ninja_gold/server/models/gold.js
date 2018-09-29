//Require the Mongoose Module
var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gold');
var GoldSchema = new mongoose.Schema({
    verdict: {type:String, required: true,},
    gold: {type: Number, required: true}
},{timestamps:true});
mongoose.model('Gold', GoldSchema);