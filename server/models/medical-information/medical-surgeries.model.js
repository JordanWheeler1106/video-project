/**
 * Created by Juan Pablo Delprato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var medicalSurgeriesSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    surgeonName: String,
    addedNamesInfo: Array,
    description: String,
    date: Date,
    street: String,
    addedLocationInfo: Array,
    city: String,
    state: String,
    country: String,
    phone: String,
    notes: String,
    surgery: String
});


var MedicalSurgeriesSchema = mongoose.model('MedicalSurgeriesSchema', medicalSurgeriesSchema);

module.exports = MedicalSurgeriesSchema;
