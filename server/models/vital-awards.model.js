/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vitalAwardsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    association: String,
    awards: String,
    honors: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number, 
    country: String,
    date: Date,
    notes: String
});


// the schema is useless so far
// we need to create a model using it
var VitalAwards = mongoose.model('VitalAwards', vitalAwardsSchema);

// make this available to Nugget in our Node applications
module.exports = VitalAwards;