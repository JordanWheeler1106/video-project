/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var topicSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    color: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// the schema is useless so far
// we need to create a model using it
var Topic = mongoose.model('Topic', topicSchema);

// make this available to Nugget in our Node applications
module.exports = Topic;