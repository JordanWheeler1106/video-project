/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalAllergiesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: String,
    symptoms: String,
    diegnosedDate: Date,
    diagnosedAge: String,
    currentStatus: String,
    treatment: String,
    medication: String,
    addedStatusInfo: Array,
    type: String

});


var MedicalAllergiesSchema = mongoose.model('MedicalAllergiesSchema', medicalAllergiesSchema);

module.exports = MedicalAllergiesSchema;