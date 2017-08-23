/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalAwards = require('./../models/vital-awards.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalAwards.find({user: req.params.id}).exec(function (err, awards) {
        if (err) return next(err);
        res.json(awards);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalAwards.findById(req.params.id, function (err, award) {
        if (err) return next(err);
        res.json(award);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalAwards.create(req.body, function (err, award) {
        if (err) return next(err);
        res.json(award);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalAwards.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, award) {
        if (err) return next(err);
        res.json(award);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalAwards.findByIdAndRemove(req.params.id, function (err, award) {
        if (err) return next(err);
        res.json(award);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalAwards.remove({'_id':{'$in':req.body.ids}}, function(err, award) {
      if (err) return next(err);
      res.json(award);
    });
});

router.post('/batch', function(req, res, next) {
    VitalAwards.insertMany(req.body.data, function(err, awards) {
      if(err) return next(err);
      res.json(awards);
    })
});

module.exports = router;