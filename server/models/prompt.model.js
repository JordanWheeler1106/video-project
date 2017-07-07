var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var promptSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    folder: {
        type: Schema.Types.ObjectId,
        required: true
    }
});



var Prompt = mongoose.model('Prompt', promptSchema);
module.exports = Prompt;