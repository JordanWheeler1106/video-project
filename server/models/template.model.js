/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var templateSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    price: Number,
    description: String,
    tags: [{type:mongoose.Schema.Types.ObjectId, ref: 'Tag'}],
    topic: {
      type: Schema.Types.ObjectId,
      ref: 'Topic'
    },
    folders: [{type:mongoose.Schema.Types.ObjectId, ref: 'Folder'}],
    nuggets: [{type:mongoose.Schema.Types.ObjectId, ref: 'Nugget'}],
    status: {
      type: String,
      default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// the schema is useless so far
// we need to create a model using it
var Template = mongoose.model('Template', templateSchema);

// make this available to Nugget in our Node applications
module.exports = Template;