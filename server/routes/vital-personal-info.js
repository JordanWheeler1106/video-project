/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalPersonalInfo = require('./../models/vital-personal-info.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalPersonalInfo.find({user: req.params.id}).exec(function (err, personalinfos) {
        if (err) return next(err);
        res.json(personalinfos);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalPersonalInfo.findById(req.params.id, function (err, personalinfo) {
        if (err) return next(err);
        res.json(personalinfo);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalPersonalInfo.create(req.body, function (err, personalinfo) {
        if (err) return next(err);
        res.json(personalinfo);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalPersonalInfo.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, personalinfo) {
        if (err) return next(err);
        res.json(personalinfo);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalPersonalInfo.findByIdAndRemove(req.params.id, function (err, personalinfo) {
        if (err) return next(err);
        res.json(personalinfo);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalPersonalInfo.remove({'_id':{'$in':req.body.ids}}, function(err, personalinfo) {
      if (err) return next(err);
      res.json(personalinfo);
    });
});

router.post('/batch', function(req, res, next) {
    VitalPersonalInfo.insertMany(req.body.data, function(err, personalinfos) {
      if(err) return next(err);
      res.json(personalinfos);
    })
});

module.exports = router;