/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalProceduresSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    condition: String,
    nameDescription: String,
    date: Date,
    notes: String,
    physician: String,
    physicianPhone: String,
    primaryCare: String,
    primaryCarePhone: String,
    institution: String,
    street: String,
    addedLocationInfo: Array,
    city: String,
    state: String,
    zipcode: Number,
    country: String

});


var MedicalProceduresSchema = mongoose.model('MedicalProceduresSchema', medicalProceduresSchema);

module.exports = MedicalProceduresSchema;
