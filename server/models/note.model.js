var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var noteSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    folder: {
        type: Schema.Types.ObjectId,
        required: true
    }
});



var Note = mongoose.model('Note', noteSchema);
module.exports = Note;