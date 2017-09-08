/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var sendMail = require('./../components/email');
var Share = require('./../models/share.model');
var User = require('./../models/user.model');
var aws = require('aws-sdk');
aws.config.loadFromPath('config.json');
var path = require('path');
var EmailTemplate = require('email-templates').EmailTemplate;

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    Share.find({shareFrom: req.params.id}).populate('shareTo').exec(function (err, share) {
        if (err) return next(err);
        res.json(share);
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
    Share.findById(req.params.id).populate('shareTo').exec(function (err, share) {
        if (err) return next(err);
        res.json(share);        
    });
});

router.get('/resend/:id', function(req, res, next) {  
    Share.findById(req.params.id).populate('shareTo').exec(function (err, share) {
        if (err) return next(err);
        if(share) {
          // var share_email = '<div>'+ req.body.name +' has share a document with you please select the link below to login to <a href="user email clickable link">The Human Experience</a> to review the shared document.</div>';
          // share_email = share_email.replace('user email clickable link', 'http://thehumexpdevelop.com/#/?token=' + share._id);
          //send mail to user.
          var templatesDir = path.resolve(__dirname, '../../public/templates/email');
          var template = new EmailTemplate(path.join(templatesDir, 'share-document'));
          template.render({share_code: share._id, shared_user: req.body.name}, function(err, tmp) {
              if(err) {
                return console.error(err);
              }
              var ses = new aws.SES({apiVersion: '2010-12-01'});

              // this sends the email
              // @todo - add HTML version
              ses.sendEmail( {
                 Source: "The Human Experience <admin@thehumanexperience.info>",
                 Destination: { ToAddresses: [share.shareTo.email] },
                 Message: {
                     Subject: {
                        Data: 'Share Document from Human Experience'
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
                  res.json(share);
               });
          });
        } else {
          res.send(404);
        }
    });
});

router.post('/accept', function(req, res, next) {  
    Share.findById(req.body.shareid, function (err, share) {
        if (err) return next(err);
        if(share) {
          share.status="accepted"
          Share.findByIdAndUpdate(share._id, share, {new : true}, function (err, share) {
              if (err) return next(err);
              res.json(share);
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
          req.body.share.shareTo = user._id;
          Share.find({ $and: [{shareTo: req.body.share.shareTo}, {shareFrom: req.body.share.shareFrom}]}, function(err, checkShare) {            
            if (err) return next(err);
            if(checkShare.length > 0) {
              res.send(405);
            }
            else {
              Share.create(req.body.share, function (err, share) {
                  if (err) return next(err);
                  if(share) {
                    // var share_email = '<div>'+ req.body.name +' has share a document with you please select the link below to login to <a href="user email clickable link">The Human Experience</a> to review the shared document.</div>';
                    // share_email = share_email.replace('user email clickable link', 'http://thehumexpdevelop.com/#/?token=' + share._id);
                    //send mail to user.
                    var templatesDir = path.resolve(__dirname, '../../public/templates/email');
                    var template = new EmailTemplate(path.join(templatesDir, 'share-document'));
                    template.render({share_code: share._id, shared_user: req.body.name}, function(err, tmp) {
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
                                  Data: 'Share Document from Human Experience'
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
                            res.json(share);
                         });
                    });
                  } else {
                    res.send(404);
                  }
              });
            }
          });          
        }
        else
          res.json(404);
    });    
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Share.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, share) {
        if (err) return next(err);
        res.json(invite);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    Share.findByIdAndRemove(req.params.id, function (err, share) {
        if (err) return next(err);
        res.json(share);
    });
});

module.exports = router;