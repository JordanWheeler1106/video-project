/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalMedicationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    condition: String,
    physcian: String,
    physcianPhone: String,
    notes: String,
    nameMedication: String,
    dosage: String,
    frequency: String,
    medicationNotes: String

});


var MedicalMedicationSchema = mongoose.model('MedicalMedicationSchema', medicalMedicationSchema);

module.exports = MedicalMedicationSchema;