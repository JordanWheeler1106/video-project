/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalEducation = require('./../models/vital-education.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalEducation.find({user: req.params.id}).exec(function (err, educations) {
        if (err) return next(err);
        res.json(educations);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalEducation.findById(req.params.id, function (err, education) {
        if (err) return next(err);
        res.json(education);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalEducation.create(req.body, function (err, education) {
        if (err) return next(err);
        res.json(education);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalEducation.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, education) {
        if (err) return next(err);
        res.json(education);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalEducation.findByIdAndRemove(req.params.id, function (err, education) {
        if (err) return next(err);
        res.json(education);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalEducation.remove({'_id':{'$in':req.body.ids}}, function(err, education) {
      if (err) return next(err);
      res.json(education);
    });
});

router.post('/batch', function(req, res, next) {
    VitalEducation.insertMany(req.body.data, function(err, educations) {
      if(err) return next(err);
      res.json(educations);
    })
});

module.exports = router;