const mongoose = require('mongoose');
var Note = mongoose.model('Notes');
module.exports = {
    getNotes: (req, res) => {
        Note.find({}, (err, notes) =>{
            if(err){
                console.log("Error getting notes.", err);
                res.json({message: "Error", error: err});
            } else {
                res.json({message:"Success", notes: notes});
            }
        });
    },
    createNote: (req, res) => {
        console.log("Post this: ",req.body);
        var note = new Note({note:req.body.note});
        note.save( err => {
            if(err){
                console.log("Failure posting. ", err);
                res.json({message:"Error", error:err});
            } else {
                Note.find({}, (err, notes) => {
                    if(err) {
                        console.log(err);
                        res.json({message:"Error", error:err});
                    } else {
                        console.log("Success", notes);
                        res.json({message:"Success",notes:notes});
                    }
                });
            }
        });
    }
}