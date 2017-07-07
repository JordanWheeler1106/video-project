/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Tag = require('./../models/tag.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all', function(req, res, next) {
    Tag.find({}, function (err, tags) {
        if (err) return next(err);
        res.json(tags);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    Tag.findById(req.params.id, function (err, tag) {
        if (err) return next(err);
        res.json(tag);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    Tag.create(req.body, function (err, tag) {
        if (err) return next(err);
        res.json(tag);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Tag.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, tag) {
        if (err) return next(err);
        res.json(tag);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    Tag.findByIdAndRemove(req.params.id, function (err, tag) {
        if (err) return next(err);
        res.json(tag);
    });
});

module.exports = router;