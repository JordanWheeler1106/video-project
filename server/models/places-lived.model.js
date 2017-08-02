/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var personalInfoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    street: String,
    city: String,
    state: String,
    zip: Number, 
    country: String,
    ptype: String,
    startDate: Date,
    endDate: Date,
    notes: String
});


// the schema is useless so far
// we need to create a model using it
var Nugget = mongoose.model('Nugget', nuggetSchema);

// make this available to Nugget in our Node applications
module.exports = Nugget;