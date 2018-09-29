var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teams')
var PlayerSchema = new mongoose.Schema({
    name:{type:String, required:true, minlength:[2,"NAme must be at least 2 characters."]},
    status:{type:Number, default:0},
    position:{type:String, required:false}
},{timestamps:true});
var GameSchema = new mongoose.Schema({
    number:{type:Number},
    players:[PlayerSchema]
},{timestamps:true});
mongoose.model('Player', PlayerSchema);
mongoose.model('Game', GameSchema);