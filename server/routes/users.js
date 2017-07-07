/**
 * Created by UmairAhmed on 6/6/2017.
 */

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var User = require('./../models/user.model.js');
var sendMail = require('./../components/email');
var aws = require('aws-sdk');
var uuid = require('node-uuid');
var stripe = require('stripe')('sk_test_5OkzLmaV7pKtbBpokhXYO8mX');

//TODO create auth middleware for checking authorizations.

/* GET ALL UserS */
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
                var reset_password = '<div>A request to reset your password has been requested and a link has been sent to the email on file. Select the link below to reset your password.</div><a href="user email clickable link">click here to redirect to reset password page</a>';
                reset_password = reset_password.replace('user email clickable link', 'http://thehumexpdevelop.com/#/changePassword/' + user._id);
                //send mail to user.
                sendMail({
                    to: email, // list of receivers
                    subject: 'Reset Password!', // Subject line
                    html: reset_password
                });
                res.json({message: "Your request has been submitted please check your mail"});
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
    stripe.plans.list(
      { limit: 10 },
      function(err, plans) {
        // asynchronously called
        if (err) return next(err);
        res.json(plans);
      }
    );
});

router.get('/deletePlan/:id', function(req, res, next) {
    stripe.plans.del(
      req.params.id,
      function(err, confirmation) {
        // asynchronously called
        if (err) return next(err);
        res.json({result: true});
      }
    );
});

router.put('/updatePlan', function(req, res, next) {
    var updatedPlan = {
      name: req.body.name
    }
    stripe.plans.update(
      req.body.id, updatedPlan,
      function(err, confirmation) {
        // asynchronously called
        if (err) return next(err);
        res.json({result: true});
      }
    );
});

router.post('/addPlan', function(req, res, next) {
    var plan = {
      amount: req.body.price * 100,
      interval: "month",
      name: req.body.name,
      currency: "usd",
      id: req.body.name,
      statement_descriptor: req.body.description
    }
    stripe.plans.create(
      plan,
      function(err, plan) {
        // asynchronously called
        if (err) return next(err);
        res.json({result: true});
      }
    );
});

router.post('/getCustomer', function(req, res, next) {
    stripe.customers.retrieve(
      req.body.customerId,
      function(err, customer) {
        // asynchronously called
        if (err) return next(err);
        res.json(customer);
      }
    );
});

router.post('/changeCard', function(req, res, next) {
  if(req.body.cardId==0) {
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
  stripe.subscriptions.del(
    req.body.subscriptionId,
    function(err, confirmation) {
      // asynchronously called
      if (err) return next(err);
      res.json(confirmation);
    }
  );
});

router.post('/changePlan', function(req, res, next) {
    if(req.body.subscriptionId) {
      stripe.subscriptions.update(
        req.body.subscriptionId,
        { plan: req.body.planId },
        function(err, subscription) {
          if (err) return next(err);
          res.json(subscription);
        }
      );
    } else {
      stripe.subscriptions.create({
        customer: req.body.customerId,
        plan: req.body.planId
      }, function(err, subscription) {
          // asynchronously called
          if (err) return next(err);
          res.json(subscription);
        }
      );
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
    stripe.customers.create(
      { email: req.body.email },
      function(err, customer) {
        if(err)
            return res.status(400).send({message: 'something went wrong.'});
        else {
            newUser.stripeCustomerId = customer.id;
            newUser.save(function(err, user) {
                if (err) {
                    return res.status(400).send({message: 'something went wrong.'});
                }
                //generate token for next 10 hours.
                var welcome_email = '<div>Welcome to The Human Experience our goal is to help you document your life story and share with the world!</div>';
                
                //send mail to user.
                sendMail({
                    to: req.body.email, // list of receivers
                    subject: 'Welcome to Humun Experience!', // Subject line
                    html: welcome_email
                });
                
                var token = jwt.sign({_id: user._id }, 'human_exp', { expiresIn: "10h" });
                res.json({token: token});
            });
        }
      }
    );    
});

/* LOGIN User */
router.post('/login', function(req, res, next) {
    User.findOne({ email: req.body.email , status: 'active'}, function(err, user) {
        if (err) return next(err);

        if(user){
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
        else {
            res.send(404)
        }
    });
});

/* UPDATE User */
router.post('/resetPassword/:id', function (req, res, next) {
    var userId = req.params.id;
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

/* DELETE User */
router.delete('/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, req.body, function (err, user) {
        if (err) return next(err);
        res.json(user);
    });
});

module.exports = router;