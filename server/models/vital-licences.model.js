/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vitalLicencesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    street: String,
    city: String,
    authority: String,
    grantedDate: Date,
    state: String,
    zipcode: Number,
    country: String,
    type: String,
    address: String,
    addedAddressInfo: Array,
    pobox: String,
    notes: String,
    term: String
});


// the schema is useless so far
// we need to create a model using it
var VitalLicences = mongoose.model('VitalLicences', vitalLicencesSchema);

// make this available to Nugget in our Node applications
module.exports = VitalLicences;
