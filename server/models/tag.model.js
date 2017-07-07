/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tagSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },    
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// the schema is useless so far
// we need to create a model using it
var Tag = mongoose.model('Tag', tagSchema);

// make this available to Nugget in our Node applications
module.exports = Tag;