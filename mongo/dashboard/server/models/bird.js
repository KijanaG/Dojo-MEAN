var mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/birds');
var BirdSchema = new mongoose.Schema({
    name: {type:String, required: true, minlength: [3,"Too few characters"]},
    color: {type: String, required: true},
    type:{type:String, required: true, min:[4,"That's a species of bird?"]}
    },{timestamps:true});
mongoose.model('Bird', BirdSchema);