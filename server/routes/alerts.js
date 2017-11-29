var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Alert = require('./../models/alert.model');

router.get('/all/:email', function(req, res){
    var email = req.params.email;
    Alert.find({account: email}).sort('-createdAt').exec(function(err, alerts){
        if (err) return next(err);
        res.send(alerts);
    });
})

router.post('/batch', function(req, res, next) {
    Alert.insertMany(req.body.alerts, function(err, alerts) {
      if(err) return next(err);
      res.json(alerts);
    })
});

router.post('/batch/delete', function(req, res, next) {
    Alert.remove({'_id':{'$in':req.body.alerts}}, function(err, alerts) {
      if (err) return next(err);
      res.json(alerts);
    });
});

router.delete('/:id', function(req, res, next) {
    Alert.findByIdAndRemove(req.params.id, function (err, alert) {
        if (err) return next(err);
        res.json(alert);
    });
});

module.exports = router;
