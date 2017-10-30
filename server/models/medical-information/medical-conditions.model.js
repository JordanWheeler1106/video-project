/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalConditionsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String, 
    type: String,
    conditionType: String,
    diagnosisDate: Date,
    source: String,
    notes: String,
    prognosis: String,
    status: String,
    treatment: String,
    physician: String,
    physicianPhone: String
});


var MedicalConditionsSchema = mongoose.model('MedicalConditionsSchema', medicalConditionsSchema);

module.exports = MedicalConditionsSchema;