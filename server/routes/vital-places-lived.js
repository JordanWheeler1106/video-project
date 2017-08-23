/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalPlacesLived = require('./../models/vital-places-lived.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalPlacesLived.find({user: req.params.id}).exec(function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalPlacesLived.findById(req.params.id, function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalPlacesLived.create(req.body, function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalPlacesLived.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalPlacesLived.findByIdAndRemove(req.params.id, function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalPlacesLived.remove({'_id':{'$in':req.body.ids}}, function(err, placeslived) {
      if (err) return next(err);
      res.json(placeslived);
    });
});

router.post('/batch', function(req, res, next) {
    VitalPlacesLived.insertMany(req.body.data, function(err, placeslived) {
      if(err) return next(err);
      res.json(placeslived);
    })
});

module.exports = router;