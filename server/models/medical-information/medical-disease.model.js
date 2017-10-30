/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalDiseaseSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    type: String,
    diseaseVariation: String,
    diagnosisDate: Date,
    source: String,
    notesSymptoms: String,
    exposed: String,
    addedDiseaseInfo: Array,
    prognosis: String,
    treatment: String,
    physician: String,
    physicianPhone: String,
    addedMedicationIngo: Array
});


var MedicalDiseaseSchema = mongoose.model('MedicalDiseaseSchema', medicalDiseaseSchema);

module.exports = MedicalDiseaseSchema;