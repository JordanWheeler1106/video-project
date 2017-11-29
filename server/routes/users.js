/**
 * Created by UmairAhmed on 6/6/2017.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('./../models/user.model.js');
var Alert = require('./../models/alert.model.js');
var sendMail = require('./../components/email');
var aws = require('aws-sdk');
var uuid = require('node-uuid');
aws.config.loadFromPath('config.json');
var stripe = require('stripe')('sk_test_5OkzLmaV7pKtbBpokhXYO8mX');
var path = require('path');
var EmailTemplate = require('email-templates').EmailTemplate;
var xmlparser = require('express-xml-bodyparser');

var Recurly = require('node-recurly');
var recurly = new Recurly({
  API_KEY: '7128c6ed6461437abeb00909573756e5',
	SUBDOMAIN:    'ththehumanexperience',
	ENVIRONMENT:  'sandbox',
	DEBUG: false
});

//TODO create auth middleware for checking authorizations.

/* GET ALL UserS */

router.post('/webhook', xmlparser({trim: false, explicitArray: false}), function(req, res, next) {
  // check req.body
  var type = '', account = '';
  for(key1 in req.body) {
    type = key1;
    for(key2 in req.body[type])
      if(key2 == 'account') {
        account = req.body[key1][key2][0].account_code[0];
        break;
      }
    break;
  }

  Alert.create({type: type, account: account}, function (err, alert) {
      if (err) return next(err);
      res.json(true);
  })
});

router.get('/', function(req, res, next) {
    User.find(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* GET SINGLE User BY ID */
router.get('/email/:id', function(req, res, next) {
    var email = req.params.id,
        resetPassword = new Date();

    User.findOneAndUpdate(
        {email: email},
        {$set:{resetPassword: new Date(resetPassword.setDate(resetPassword.getDate()+1))}}, function(err, user, next){
            if(err) return next(err);
            if(user){
                //mail template.
                var templatesDir = path.resolve(__dirname, '../../public/templates/email');
                var template = new EmailTemplate(path.join(templatesDir, 'password-reset'));
                template.render({reset_code: user._id}, function(err, tmp) {
                    if(err) {
                      return console.error(err);
                    }
                    var ses = new aws.SES({apiVersion: '2010-12-01'});

                    // this sends the email
                    // @todo - add HTML version
                    ses.sendEmail( {
                       Source: "The Human Experience <admin@thehumanexperience.info>",
                       Destination: { ToAddresses: [email] },
                       Message: {
                           Subject: {
                              Data: 'Reset Password'
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
                        res.json({message: "Your request has been submitted please check your mail"});
                     });
                });
            }
            else{
                res.send(404)
            }
        })
})

/* GET SINGLE User BY ID */
router.get('/:id', function(req, res, next) {
    User.findById(req.params.id, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

router.put('/changeStatus', function(req, res){
    var id = req.body.id;
    var status = req.body.status;
    var allStatus = ['active', 'suspend']
    if(id &&  allStatus.indexOf(status)>=0){
        User.findOneAndUpdate({_id: id}, { $set: {status: status} }, function(err, user){
            if (err) res.status(500).json({message: "error in update"});
            else{
                res.send(user);
            }
        });
    }
})

router.post('/getAllPlans', function(req, res, next) {
    recurly.plans.list({}, function(err, plans) {
      if (err) return next(err);
      res.json(plans);
    })
    // stripe.plans.list(
    //   { limit: 10 },
    //   function(err, plans) {
    //     // asynchronously called
    //     if (err) return next(err);
    //     res.json(plans);
    //   }
    // );
});

router.get('/deletePlan/:id', function(req, res, next) {
    recurly.plans.remove(req.params.id, function(err, confirm) {
      if (err) return next(err);
      res.json({result: true});
    })
    // stripe.plans.del(
    //   req.params.id,
    //   function(err, confirmation) {
    //     // asynchronously called
    //     if (err) return next(err);
    //     res.json({result: true});
    //   }
    // );
});

router.put('/updatePlan', function(req, res, next) {
    var updatedPlan = {
      plan_code: req.body.name
    }
    recurly.plans.update(req.body.id, updatedPlan, function(err, confirm) {
      if (err) return next(err);
      res.json({result: true});
    })
    // stripe.plans.update(
    //   req.body.id, updatedPlan,
    //   function(err, confirmation) {
    //     // asynchronously called
    //     if (err) return next(err);
    //     res.json({result: true});
    //   }
    // );
});

router.post('/addPlan', function(req, res, next) {
    var plan = {
      unit_amount_in_cents: [{'USD': req.body.price * 100}],
      plan_code: req.body.name,
      name: req.body.name,
      description: req.body.description
    }
    recurly.plans.create(plan, function(err, confirm) {
      if (err) return next(err);
      res.json({result: true});
    })
    // stripe.plans.create(
    //   plan,
    //   function(err, plan) {
    //     // asynchronously called
    //     if (err) return next(err);
    //     res.json({result: true});
    //   }
    // );
});

router.post('/getCustomer', function(req, res, next) {
    recurly.accounts.get(req.body.customerId, function(err, account) {
      if (err) return next(err);
      recurly.billingInfo.get(req.body.customerId, function(err, billingInfo) {
        if (err) { billingInfo = { data: { billing_info: null }} }
        recurly.subscriptions.listByAccount(req.body.customerId, {}, function(err, subscriptions) {
          if (err) return next(err);
          res.json({account: account.data.account, billingInfo: billingInfo.data.billing_info, subscriptions: subscriptions.data.subscriptions});
        })
      })
    })
    // stripe.customers.retrieve(
    //   req.body.customerId,
    //   function(err, customer) {
    //     // asynchronously called
    //     if (err) return next(err);
    //     res.json(customer);
    //   }
    // );
});

router.post('/changeCard', function(req, res, next) {
  if(req.body.cardId==0) {
    recurly.billingInfo.create(req.body.customerId, {
      first_name: req.body.card.first_name,
      last_name: req.body.card.last_name,
      number: req.body.card.number,
      month: req.body.card.month,
      year: req.body.card.year,
      address1: req.body.card.address,
      city: req.body.card.state,
      state: req.body.card.state,
      country: req.body.card.country,
      zip: req.body.card.zipcode,
      verification_value: req.body.card.cvc
    }, function(err, card) {
      console.log(JSON.stringify(err));
      if (err) return next(err);
      res.json(card);
    })
    // stripe.customers.createSource(req.body.customerId, {
    //   source: {
    //      object: 'card',
    //      name: req.body.card.name,
    //      exp_month: req.body.card.month,
    //      exp_year: req.body.card.year,
    //      number: req.body.card.number,
    //      cvc: req.body.card.cvc
    //   }
    // }, function(err, card) {
    //   if (err) return next(err);
    //   res.json(card);
    // });
  } else {
    stripe.customers.deleteCard(req.body.customerId, req.body.cardId,
      function(err, confirmation) {
        // asynchronously called
        if (err) return next(err);
        stripe.customers.createSource(req.body.customerId, {
          source: {
             object: 'card',
             name: req.body.card.name,
             exp_month: req.body.card.month,
             exp_year: req.body.card.year,
             number: req.body.card.number,
             cvc: req.body.card.cvc
          }
        }, function(err, card) {
          if (err) return next(err);
          res.json(card);
        });
      }
    );
  }
});

router.post('/cancelPlan', function(req, res, next) {
  recurly.subscriptions.cancel(req.body.subscriptionId, function(err, confirm) {
    if (err) return next(err);
    res.json(confirm);
  })
  // stripe.subscriptions.del(
  //   req.body.subscriptionId,
  //   function(err, confirmation) {
  //     // asynchronously called
  //     if (err) return next(err);
  //     res.json(confirmation);
  //   }
  // );
});

router.post('/reactivatePlan', function(req, res, next) {
  recurly.subscriptions.reactivate(req.body.subscriptionId, function(err, confirm) {
    if (err) return next(err);
    res.json(confirm);
  })
  // stripe.subscriptions.del(
  //   req.body.subscriptionId,
  //   function(err, confirmation) {
  //     // asynchronously called
  //     if (err) return next(err);
  //     res.json(confirmation);
  //   }
  // );
});


router.post('/changePlan', function(req, res, next) {
    if(req.body.subscriptionId) {
      recurly.subscriptions.cancel(req.body.subscriptionId, function(err, confirm) {
        if (err) return next(err);
        recurly.subscriptions.create({
          plan_code: req.body.planId,
          account: {
            account_code: req.body.customerId,
            billing_info: {
              first_name: req.body.billingInfo.first_name,
              last_name: req.body.billingInfo.last_name,
              number: req.body.billingInfo.number,
              month: req.body.billingInfo.month,
              year: req.body.billingInfo.year,
              address1: req.body.billingInfo.address,
              city: req.body.billingInfo.city,
              state: req.body.billingInfo.state,
              country: req.body.billingInfo.country,
              zip: req.body.billingInfo.zipcode,
              verification_value: req.body.billingInfo.cvc,
            }
          },
          currency: 'USD'
        }, function(err, subscription) {
          if (err) return next(err);
          res.json(subscription);
        })
      })
      // stripe.subscriptions.update(
      //   req.body.subscriptionId,
      //   { plan: req.body.planId },
      //   function(err, subscription) {
      //     if (err) return next(err);
      //     res.json(subscription);
      //   }
      // );
    } else {
      recurly.subscriptions.create({
        plan_code: req.body.planId,
        account: {
          account_code: req.body.customerId,
          billing_info: {
            first_name: req.body.billingInfo.first_name,
            last_name: req.body.billingInfo.last_name,
            number: req.body.billingInfo.number,
            month: req.body.billingInfo.month,
            year: req.body.billingInfo.year,
            address1: req.body.billingInfo.address,
            city: req.body.billingInfo.city,
            state: req.body.billingInfo.state,
            country: req.body.billingInfo.country,
            zip: req.body.billingInfo.zipcode,
            verification_value: req.body.billingInfo.cvc,
          }
        },
        currency: 'USD'
      }, function(err, subscription) {
        console.log(JSON.stringify(err));
        if (err) return next(err);
        res.json(subscription);
      })
      // stripe.subscriptions.create({
      //   customer: req.body.customerId,
      //   plan: req.body.planId
      // }, function(err, subscription) {
      //     // asynchronously called
      //     if (err) return next(err);
      //     res.json(subscription);
      //   }
      // );
    }
})

router.post('/uploadPhoto', function(req, res) {
		var s3bucket = new aws.S3({
			accessKeyId: "AKIAJ7F6MIL3CLFPVMAQ",
    	secretAccessKey: "YtxcVst+lgTHDy8kvN8Mz8HdEheJxNS3Pi7W28vS",
			region: 'us-east-1'
		});
		var buf = new Buffer(req.body.photo.replace(/^data:image\/\w+;base64,/, ""),'base64')
		var params = {
			Key: uuid.v1()+'.jpg',
			Body: buf,
			Bucket: 'human-users',
			ContentEncoding: 'base64',
			ContentType: 'image/jpg',
			ACL: 'public-read-write'
		}

		s3bucket.upload(params, function(err, result) {
			if(err) {
				res.send({result:false, error:'Photo uploading error', errorMessage: err});
			} else {
				res.send({result:true, url:result.Location});
			}
		})
});

/* SAVE User */
router.post('/', function(req, res, next) {
    var newUser = new User(req.body);
    recurly.accounts.create({
      account_code: req.body.email,
      email: req.body.email
    }, function(err, customer) {
      if(err)
          return res.status(400).send({message: 'something went wrong.'});
      else {
          newUser.save(function(err, user) {
              if (err) {
                  return res.status(400).send({message: 'something went wrong.'});
              }
              //generate token for next 10 hours.
              var templatesDir = path.resolve(__dirname, '../../public/templates/email');
              var template = new EmailTemplate(path.join(templatesDir, 'register'));
              template.render({}, function(err, tmp) {
                  if(err) {
                    return console.error(err);
                  }
                  var ses = new aws.SES({apiVersion: '2010-12-01'});

                  // this sends the email
                  // @todo - add HTML version
                  ses.sendEmail( {
                     Source: "The Human Experience <admin@thehumanexperience.info>",
                     Destination: { ToAddresses: [user.email] },
                     Message: {
                         Subject: {
                            Data: 'Welcome to The Human Experience'
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
                      var token = jwt.sign({_id: user._id }, 'human_exp', { expiresIn: "10h" });
                      res.json({token: token});
                   });
              });
          });
      }
    })
    // stripe.customers.create(
    //   { email: req.body.email },
    //   function(err, customer) {
    //
    //   }
    // );
});

router.post('/login', function(req, res, next) {
    User.findOne({ email: req.body.email}, function(err, user) {
        if (err) return next(err);

        if(user){
            if(user.password == req.body.password) {
              User.findOneAndUpdate({_id: user._id}, { $set: {lastLogin: Date.now()} }, function(err, user){
                  if (err) res.status(500).json({message: "error in update"});
                  else{
                      var token = jwt.sign({_id: user._id }, 'human_exp', { expiresIn: "10h" });
                      res.json({token: token, user: user});
                  }
              })
            } else {
              user.comparePassword(req.body.password, function(err, isMatch) {
                  if (err) res.send(400);
                  else if(isMatch){
                      User.findOneAndUpdate({_id: user._id}, { $set: {lastLogin: Date.now()} }, function(err, user){
                          if (err) res.status(500).json({message: "error in update"});
                          else{
                              var token = jwt.sign({_id: user._id }, 'human_exp', { expiresIn: "10h" });
                              res.json({token: token, user: user});
                          }
                      })
                  }
                  else res.status(403).send({message: 'The email or password ou have enter is incorrect.'})
              });
            }
        }
        else {
            res.send(404)
        }
    });
});

/* UPDATE User */
router.post('/resetPassword', function (req, res, next) {
    var userId = req.body.userId;
    var newPass = String(req.body.newPassword);

    return User.findOne({_id: userId}, function(err, user){
        if (err) res.send(500);
        if(user) {
            user.password = newPass;
            user.resetPassword = null;
            return user.save(function(err, user){
                if (err) res.send(500);
                res.status(200).send({message: 'Password change successfully.'});
            })
        } else {
            return res.status(403).json({message: 'Already used or Expired link.'});
        }
    })
});

/* UPDATE User */
router.put('/:id', function(req, res, next) {
    User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

/* UPDATE Users */
router.post('/batch', function(req, res, next) {
    var bulk = User.collection.initializeOrderedBulkOp();
    for(var i = 0; i < req.body.users.length; i++) {
      bulk.find( { 'email': req.body.users[i].email } ).update( { $set: { copiedTemplates: req.body.users[i].copiedTemplates } } )
    }
    bulk.execute(function (err, users) {
        if (err) return next(err);
        res.json(users);
    });
});

/* DELETE User */
router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

module.exports = router;
