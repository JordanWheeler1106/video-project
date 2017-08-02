/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Nugget = require('./../models/nugget.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    Nugget.find({author: req.params.id}, function (err, nuggets) {
        if (err) return next(err);
        res.json(nuggets);
    });
});

router.get('/all/:id/:parentId', function(req, res, next) {
    Nugget.find({author: req.params.id, parentId: req.params.parentId}, function (err, nuggets) {
        if (err) return next(err);
        res.json(nuggets);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    Nugget.findById(req.params.id, function (err, nugget) {
        if (err) return next(err);
        res.json(nugget);
    });
});

router.post('/search', function(req, res, next) {
    Nugget.find({author: req.body.userId, parentId: "root", $or: [{ name: {$regex: ".*" + req.body.search + ".*" }}, {tags: {$elemMatch: {text: {$regex: ".*" + req.body.search + ".*" }}}}]}).exec(function (err, nuggets) {
        if (err) return next(err);
        Nugget.find({author: req.body.userId, parentId: {$ne: "root"}, $or: [{ name: {$regex: ".*" + req.body.search + ".*" }}, {tags: {$elemMatch: {text: {$regex: ".*" + req.body.search + ".*" }}}}]}).populate('parentId').exec(function (err, childNuggets) {
            if (err) return next(err);
            res.json(nuggets.concat(childNuggets));
        });        
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    Nugget.create(req.body, function (err, nugget) {
        if (err) return next(err);
        res.json(nugget);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Nugget.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, nugget) {
        if (err) return next(err);
        res.json(nugget);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    Nugget.findByIdAndRemove(req.params.id, function (err, nugget) {
        if (err) return next(err);
        res.json(nugget);
    });
});

module.exports = router;