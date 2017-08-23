/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vitalPersonalInfoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstName: String,
    middleName: String,
    lastName: String,
    birthDate: Date,
    birthCity: String,
    birthState: String,
    deathDate: Date,
    deathCity: String,
    deathState: String,
    gender: String,
    ethnicity: String,
    notes: String
});


// the schema is useless so far
// we need to create a model using it
var VitalPersonalInfo = mongoose.model('VitalPersonalInfo', vitalPersonalInfoSchema);

// make this available to Nugget in our Node applications
module.exports = VitalPersonalInfo;