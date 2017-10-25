/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vitalEmploymentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    company: String,
    branch: String,
    title: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number, 
    country: String,
    industryType: String,
    startDate: Date,
    endDate: Date,
    addedEmployerInfo: Array,
    addedAddressInfo: Array,
    county: String,
    employmentNotes: String,
    employerNotes: String
});


// the schema is useless so far
// we need to create a model using it
var VitalEmployment = mongoose.model('VitalEmployment', vitalEmploymentSchema);

// make this available to Nugget in our Node applications
module.exports = VitalEmployment;