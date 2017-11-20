var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var noteSchema = new Schema({
    name: String,
    string: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    folder: {
        type: Schema.Types.ObjectId,
        required: true
    }
});



var Note = mongoose.model('Note', noteSchema);
module.exports = Note;
