/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var shareSchema = new Schema({
    shareFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    shareTo: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    type: String,
    comment: String,
    status: {
        type: String,
        default: 'invited',
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
var Share = mongoose.model('Share', shareSchema);

// make this available to Nugget in our Node applications
module.exports = Share;