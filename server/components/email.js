/**
 * Created by UmairAhmed on 6/7/2017.
 */

const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'humanexperience02@gmail.com',
        pass: 'human123'
    }
});

function sendMail(option) {

// setup email data with unicode symbols
    var mailOptions = {
        from: '"Human Experience" <human@example.com>'
    };

// send mail with defined transport object
    transporter.sendMail(Object.assign({}, mailOptions, option), function(error, info){
        //if (error) {
        //  return
        //}
        return
    });

};

module.exports = sendMail;