/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var sphereSchema = new Schema({
    imageScale: String,
    imageWidth: String,
    imageHeight: String,
    imageSpacing: String,
    rowOffset: String,
    eyeRadius: String,
    selectionIntensity: String,
    bendRadius: String,
    bendAmount: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// the schema is useless so far
// we need to create a model using it
var Sphere = mongoose.model('Sphere', sphereSchema);

// make this available to Nugget in our Node applications
module.exports = Sphere;
