/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vitalAssociationsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    association: String,
    position: String,
    awards: String,
    street: Number, 
    city: String,
    state: String,
    zipcode: String,
    country: String,
    startDate: Date,
    endDate: Date,
    notes: String
});


// the schema is useless so far
// we need to create a model using it
var VitalAssociations = mongoose.model('VitalAssociations', vitalAssociationsSchema);

// make this available to Nugget in our Node applications
module.exports = VitalAssociations;