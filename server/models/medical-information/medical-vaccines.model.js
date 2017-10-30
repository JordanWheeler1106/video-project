/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalVaccinesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
    reasons: String,
    name: String,
    notes: String,
    dateGiven: Date,
    period: String,
    dueAgain: Date,
    type: String

});


var MedicalVaccinesSchema = mongoose.model('MedicalVaccinesSchema', medicalVaccinesSchema);

module.exports = MedicalVaccinesSchema;