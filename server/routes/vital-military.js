/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalMilitary = require('./../models/vital-military.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalMilitary.find({user: req.params.id}).exec(function (err, militarys) {
        if (err) return next(err);
        res.json(militarys);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalMilitary.findById(req.params.id, function (err, military) {
        if (err) return next(err);
        res.json(military);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalMilitary.create(req.body, function (err, military) {
        if (err) return next(err);
        res.json(military);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalMilitary.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, military) {
        if (err) return next(err);
        res.json(military);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalMilitary.findByIdAndRemove(req.params.id, function (err, military) {
        if (err) return next(err);
        res.json(military);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalMilitary.remove({'_id':{'$in':req.body.ids}}, function(err, military) {
      if (err) return next(err);
      res.json(military);
    });
});

router.post('/batch', function(req, res, next) {
    VitalMilitary.insertMany(req.body.data, function(err, militarys) {
      if(err) return next(err);
      res.json(militarys);
    })
});

module.exports = router;