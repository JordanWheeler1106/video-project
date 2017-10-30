/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalContactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    namePrimary: String,
    relationshipPrimary: String,
    cellphonePrimary: String,
    homephonePrimary: String,
    officephonePrimary: String,
    notesPrimary: String,

    nameSecondary: String,
    relationshipSecondary: String,
    cellphoneSecondary: String,
    homephoneSecondary: String,
    officephoneSecondary: String,
    notesSecondary: String,

    nameThird: String,
    relationshipThird: String,
    cellphoneThird: String,
    homephoneThird: String,
    officephoneThird: String,
    notesThird: String
});


var MedicalContactSchema = mongoose.model('MedicalContactSchema', medicalContactSchema);

module.exports = MedicalContactSchema;