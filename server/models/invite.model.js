/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var inviteSchema = new Schema({
    inviteFrom: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    email: {
        type: String,
        required: true
    },
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
var Invite = mongoose.model('Invite', inviteSchema);

// make this available to Nugget in our Node applications
module.exports = Invite;