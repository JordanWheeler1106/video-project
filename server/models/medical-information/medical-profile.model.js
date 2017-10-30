/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    emergencyInfo: String,
    overallProfile: String,
    mentalHealth: String,
    overallVision: String,
    overallDental: String,
    currentProblems: String,
    height: String,
    weight: String,
    bloodPressure: String,
    pulseRate: String,
    bloodType: String,
    vision: String,
    hearing: String,
    notes: String,
    hereditaryConditions: String

});


var MedicalProfileSchema = mongoose.model('MedicalProfileSchema', medicalProfileSchema);

module.exports = MedicalProfileSchema;