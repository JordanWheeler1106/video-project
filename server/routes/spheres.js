var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sphere = require('./../models/sphere.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all', function(req, res, next) {
    Sphere.find({}, function (err, spheres) {
        if (err) return next(err);
        res.json(spheres);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    Sphere.findById(req.params.id, function (err, sphere) {
        if (err) return next(err);
        res.json(sphere);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    Sphere.create(req.body, function (err, sphere) {
        if (err) return next(err);
        res.json(sphere);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Sphere.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, sphere) {
        if (err) return next(err);
        res.json(sphere);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    Sphere.findByIdAndRemove(req.params.id, function (err, sphere) {
        if (err) return next(err);
        res.json(sphere);
    });
});

module.exports = router;
