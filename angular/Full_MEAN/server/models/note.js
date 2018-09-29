var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/notes')
var NotesSchema = new mongoose.Schema({
    note:{type:String, minlength: [3,"Must be at least 3 characters"], required: true},
    time: {type: Date, default: Date.now}
});
mongoose.model('Notes', NotesSchema);