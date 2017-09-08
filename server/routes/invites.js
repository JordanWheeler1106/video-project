/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sendMail = require('./../components/email');
var Invite = require('./../models/invite.model');
var User = require('./../models/user.model');
var aws = require('aws-sdk');
aws.config.loadFromPath('config.json');
var path = require('path');
var EmailTemplate = require('email-templates').EmailTemplate;

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    Invite.find({inviteFrom: req.params.id}, function (err, invites) {
        if (err) return next(err);
        res.json(invites);
    });
});
// 
// router.get('/all/:id/:parentId', function(req, res, next) {
//     Invite.find({userId: req.params.id, parentId: req.params.parentId}, function (err, invites) {
//         if (err) return next(err);
//         res.json(invites);
//     });
// });

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {  
    Invite.findById(req.params.id, function (err, invite) {
        if (err) return next(err);
        res.json(invite);        
    });
});

router.post('/accept', function(req, res, next) {  
    Invite.findById(req.body.inviteid, function (err, invite) {
        if (err) return next(err);
        if(invite && invite.email == req.body.email) {
          invite.status="accepted"
          Invite.findByIdAndUpdate(invite._id, invite, {new : true}, function (err, invite) {
              if (err) return next(err);
              res.json(invite);
          });
        } else {
          res.send(404);
        }
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
  User.findOne({email: req.body.email}, function (err, user) {
      if (err) return next(err);
      if(user) {
        res.json(404);
      }
      else {
        Invite.find({ $and: [{email: req.body.email}, {inviteFrom: req.body.inviteFrom}]}, function(err, checkInvite) {
          if (err) return next(err);
          if(checkInvite.length > 0) {
            res.send(405);
          }
          else {
            Invite.create(req.body, function (err, invite) {
                if (err) return next(err);
                if(invite) {
                  // var invitation_email = '<div>Yea!! "Customer Name" has invited you to join The Human Experience. Click the link below to start creating and sharing your life story!! :)</div><a href="user email clickable link">Accpet Invitation</a>';
                  // invitation_email = invitation_email.replace('user email clickable link', 'http://thehumexpdevelop.com/#/signup?token=' + invite._id);
                  //send mail to user.
                  var templatesDir = path.resolve(__dirname, '../../public/templates/email');
                  var template = new EmailTemplate(path.join(templatesDir, 'customer-refferal'));
                  template.render({customer_name: invite.firstName+" "+invite.lastName, invite_code: invite._id}, function(err, tmp) {
                      if(err) {
                        return console.error(err);
                      }
                      var ses = new aws.SES({apiVersion: '2010-12-01'});
        
                      // this sends the email
                      // @todo - add HTML version
                      ses.sendEmail( {
                         Source: "The Human Experience <admin@thehumanexperience.info>",
                         Destination: { ToAddresses: [req.body.email] },
                         Message: {
                             Subject: {
                                Data: 'Invitation from Human Experience'
                             },
                             Body: {
                                 Html: {
                                     Data: tmp.html,
                                 }
                              }
                         }
                      }
                      , function(err, data) {
                          if(err) throw err
                          res.json(invite);
                       });
                  });
                } else {
                  res.send(404);
                }
            })
          }
        });        
      }        
  });
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Invite.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, invite) {
        if (err) return next(err);
        res.json(invite);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    Invite.findByIdAndRemove(req.params.id, function (err, invite) {
        if (err) return next(err);
        res.json(invite);
    });
});

module.exports = router;