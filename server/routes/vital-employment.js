/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalEmployment = require('./../models/vital-employment.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalEmployment.find({user: req.params.id}).exec(function (err, employments) {
        if (err) return next(err);
        res.json(employments);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalEmployment.findById(req.params.id, function (err, employment) {
        if (err) return next(err);
        res.json(employment);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalEmployment.create(req.body, function (err, employment) {
        if (err) return next(err);
        res.json(employment);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalEmployment.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, employment) {
        if (err) return next(err);
        res.json(employment);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalEmployment.findByIdAndRemove(req.params.id, function (err, employment) {
        if (err) return next(err);
        res.json(employment);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalEmployment.remove({'_id':{'$in':req.body.ids}}, function(err, employment) {
      if (err) return next(err);
      res.json(employment);
    });
});

router.post('/batch', function(req, res, next) {
    VitalEmployment.insertMany(req.body.data, function(err, employments) {
      if(err) return next(err);
      res.json(employments);
    })
});
module.exports = router;