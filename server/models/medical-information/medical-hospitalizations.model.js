/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalHospitalizationsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    nameHospital: String,
    reason: String,
    notes: String,
    admissionDate: Date,
    dischargeDate: Date,
    physician: String,
    physicianPhone: String,
    street: String,
    addedLocationInfo: Array,
    city: String,
    state: String,

   zipcode: Number,
    country: String


});


var MedicalHospitalizationsSchema = mongoose.model('MedicalHospitalizationsSchema', medicalHospitalizationsSchema);

module.exports = MedicalHospitalizationsSchema;
