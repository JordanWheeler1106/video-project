/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vitalMilitarySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    unit: String,
    responsibilities: String,
    promotions: String,
    addedRankInfo: Array,
    addedPromotionInfo: Array,
    addedCommendationsInfo: Array,
    rank: String,
    commendations: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number, 
    country: String,
    startDate: Date,
    endDate: Date,
    notes: String
});


// the schema is useless so far
// we need to create a model using it
var VitalMilitary = mongoose.model('VitalMilitary', vitalMilitarySchema);

// make this available to Nugget in our Node applications
module.exports = VitalMilitary;