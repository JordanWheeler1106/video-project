/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalInsuranceSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    coverageType: String,
    coverageRole: String,
    company: String,
    policyNumber: String,
    beganDate: Date,
    endDate: Date,
    notes: String,
    fullCompanyName: String,
    street: String,
    type: String,
    addedCompanyInfo: Array,
    city: String,
    state: String,
    zipcode: Number,
    country: String,
    companyNotes: String,
    phone: String,
    email: String,
    insuranceAgencyName: String,
    insuranceAgent: String,
    insuranceAgentPhone: String,
    insuranceAgentNotes: String
});


var MedicalInsuranceSchema = mongoose.model('MedicalInsuranceSchema', medicalInsuranceSchema);

module.exports = MedicalInsuranceSchema;
