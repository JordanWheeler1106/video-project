var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var alertSchema = new Schema({
    type: String,
    account: String,
    isOpened: {
      type: Boolean,
      default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});



var Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
