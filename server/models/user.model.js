/**
 * Created by UmairAhmed on 6/6/2017.
 */


var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    firstName: {
        type: String,
        lowercase: true
    },
    lastName: {
        type: String,
        lowercase: true
    },
    photo: {
        type: String,
        default: "https://s3.amazonaws.com/human-users/default-user.png"
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'others']
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    birth: Date,
    address: String,
    address1: String,
    city: String,
    state: String,
    zipcode: String,
    phone: String,
    cellphone: String,
    password: {
        type: String,
        required: true
    },
    veteranDiscount: {
        type: Boolean,
        default: false
    },
    cancelPlan: {
        type: Boolean,
        default: true
    },
    archivedTemplates: [String],
    stripeCustomerId: String,
    stripePlanId: String,
    stripeSubscriptionId: String,
    billingPeriod: String,
    perpetuityDataStore: String,
    perpetuityPricePerGB: String,
    perpetuityPriceToMember: String,
    dataBeyondFree: String,
    dataPricePerGB: String,
    dataPriceToMember: String,
    voiceBeyondFree: String,
    voicePricePerGB: String,
    voicePriceToMember: String,
    referredMember1: String,
    referredMember2: String,
    totalPeriodBilling: String,
    salt: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    },
    resetPassword: Date,
    lastLogin: Date,
    status: {
        type: String,
        default: "active"
    }
});

userSchema.pre('save', function(next){
    var user = this;
// only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

// generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    })
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;