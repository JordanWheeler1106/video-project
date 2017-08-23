/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalAssociations = require('./../models/vital-associations.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalAssociations.find({user: req.params.id}).exec(function (err, associations) {
        if (err) return next(err);
        res.json(associations);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalAssociations.findById(req.params.id, function (err, association) {
        if (err) return next(err);
        res.json(association);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalAssociations.create(req.body, function (err, association) {
        if (err) return next(err);
        res.json(association);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalAssociations.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, association) {
        if (err) return next(err);
        res.json(association);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalAssociations.findByIdAndRemove(req.params.id, function (err, association) {
        if (err) return next(err);
        res.json(association);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalAssociations.remove({'_id':{'$in':req.body.ids}}, function(err, association) {
      if (err) return next(err);
      res.json(association);
    });
});

router.post('/batch', function(req, res, next) {
    VitalAssociations.insertMany(req.body.data, function(err, associations) {
      if(err) return next(err);
      res.json(associations);
    })
});

module.exports = router;