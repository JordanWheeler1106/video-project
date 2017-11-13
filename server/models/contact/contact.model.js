/**
 * Created by Juan Pablo Del Pato.
 */


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var contactsSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    contactName: String,
    relationship: Array,
    email: String,
    country: String,
    addedEmailInfo: Array,
    phone: String,
    addedPhoneInfo: Array,
    street: String,
    addedStreetInfo: String,
    city: String,
    state: String,
    addedAddressInfo: Array,
    dateBirth: Date,
    placeBirth: String,
    gender: String,
    race: String,
    ethnicity: String,
    bioNotes: String,
    causeDeath: String,
    placeDeath: String,
    religion: String,
    primaryPlaceOfLife: String,
    spouseName: String,
    addedSpouseInfo: Array,
    childName: String,
    addedChildInfo: String,
    parentName: String,
    siblingName: String,
    addedParentInfo: Array,
    addedSiblingInfo: Array,
    education: String,
    employment: String,
    military: String,
    social: String,
    miscellaneous: String

});


var ContactsSchema = mongoose.model('ContactsSchema', contactsSchema);

module.exports = ContactsSchema;
