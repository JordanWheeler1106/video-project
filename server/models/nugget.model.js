/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var nuggetSchema = new Schema({
    name: String,
    content: String,
    tags: [String],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    parentId: {
        type: String,
        ref: 'Folder'
    },
    images: [String],
    videos: [String],
    voice: [String],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
});


// the schema is useless so far
// we need to create a model using it
var Nugget = mongoose.model('Nugget', nuggetSchema);

// make this available to Nugget in our Node applications
module.exports = Nugget;