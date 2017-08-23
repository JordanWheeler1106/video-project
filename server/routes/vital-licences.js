/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalLicences = require('./../models/vital-licences.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalLicences.find({user: req.params.id}).exec(function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalLicences.findById(req.params.id, function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalLicences.create(req.body, function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalLicences.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalLicences.findByIdAndRemove(req.params.id, function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalLicences.remove({'_id':{'$in':req.body.ids}}, function(err, licences) {
      if (err) return next(err);
      res.json(licences);
    });
});

router.post('/batch', function(req, res, next) {
    VitalLicences.insertMany(req.body.data, function(err, licences) {
      if(err) return next(err);
      res.json(licences);
    })
});

module.exports = router;