/**
 * Created by UmairAhmed on 6/14/2017.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var quoteSchema = new Schema({
    name: String,   
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// the schema is useless so far
// we need to create a model using it
var Quote = mongoose.model('Quote', quoteSchema);

// make this available to Nugget in our Node applications
module.exports = Quote;