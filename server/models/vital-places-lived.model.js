/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vitalPlaceslivedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    addedResidenceInfo: Array,
    county: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number, 
    country: String,
    type: String,
    startDate: Date,
    endDate: Date,
    notes: String
});


// the schema is useless so far
// we need to create a model using it
var VitalPlacesLived = mongoose.model('VitalPlacesLived', vitalPlaceslivedSchema);

// make this available to Nugget in our Node applications
module.exports = VitalPlacesLived;