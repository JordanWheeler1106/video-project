/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var vitalEducationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    school: String,
    major: String,
    awards: String,
    street: String,
    city: String,
    state: String,
    zipcode: Number, 
    country: String,
    type: String,
    startDate: Date,
    endDate: Date,
    schoolDescription: String,
    diploma: String,
    addedSchoolAddresInfo: Array,
    others: String, 
    addedMajorInfo: Array,
    addedDiplomaInfo: Array,
    addedAwardsInfo: Array,
    addedOtherInfo: Array,
    addedExtracurricularInfo: Array,
    notes: String
});


// the schema is useless so far
// we need to create a model using it
var VitalEducation = mongoose.model('VitalEducation', vitalEducationSchema);

// make this available to Nugget in our Node applications
module.exports = VitalEducation;