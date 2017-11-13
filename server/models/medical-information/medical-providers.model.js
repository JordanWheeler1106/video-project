/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalProvidersSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    organization: String,
    sepciality: String,
    website: String,
    hospitalAffiliation: String,
    addedProviderInfo: Array,
    beganDate: Date,
    stoppedDate: Date,
    notesExperience: String,
    medicalEducation: String,
    primaryPhone: String,
    fax: String,
    answeringService: String,
    email: String,
    cellPhone: String,
    homePhone: String,
    specialContactInfo: String,
    officePhoneOne: String,
    addedOfficeInfoOne: String,
    addressOne: String,
    cityOne: String,
    stateOne: String,
    zipCodeOne: Number,
    countryOne: String,
    notesOne: String,
    officePhoneTwo: String,
    addedOfficeInfoTwo: String,
    addressTwo: String,
    cityTwo: String,
    stateTwo: String,
    zipCodeTwo: Number,
    countryTwo: String,
    notesTwo: String

});


var MedicalProvidersSchema = mongoose.model('MedicalProvidersSchema', medicalProvidersSchema);

module.exports = MedicalProvidersSchema;
