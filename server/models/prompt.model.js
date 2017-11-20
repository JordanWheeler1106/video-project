var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var promptSchema = new Schema({
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



var Prompt = mongoose.model('Prompt', promptSchema);
module.exports = Prompt;
