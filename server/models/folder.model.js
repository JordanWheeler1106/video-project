/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var folderSchema = new Schema({
    name: String,
    purpose: 0,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic'
    },
    parentId: {
        type: String,
        ref: 'Folder'
    },
    strPath: {
        type: String,
        default: 'root'
    },
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
var Folder = mongoose.model('Folder', folderSchema);

// make this available to Nugget in our Node applications
module.exports = Folder;