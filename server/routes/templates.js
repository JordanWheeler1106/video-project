/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Template = require('./../models/template.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all', function(req, res, next) {
    Template.find({}).populate('userId').populate('tags').populate('folders').populate('nuggets').exec(function (err, templates) {
        if (err) return next(err);
        res.json(templates);
    });
});

router.get('/all/:id', function(req, res, next) {
    Template.find({userId: req.params.id}).populate('userId').populate('tags').populate('folders').populate('nuggets').exec(function (err, templates) {
        if (err) return next(err);
        res.json(templates);
    });
});

router.post('/batch', function(req, res, next) {
    Template.find({'userId':{'$in':req.body.userIds}, 'status': {'$in':["approved","copiedtoall"]}}).populate('userId').populate('tags').populate('folders').populate('nuggets').exec(function(err, templates) {
      if (err) return next(err);
      res.json(templates);
    });
});

router.get('/store', function(req, res, next) {
    Template.find({status: "approved"}).populate('userId').populate('tags').populate('folders').populate('nuggets').populate('topic').exec(function (err, templates) {
        if (err) return next(err);
        res.json(templates);
    });
});

router.get('/approved', function(req, res, next) {
    Template.find({status: "copiedtoall"}).populate('userId').populate('tags').populate('folders').populate('nuggets').populate('topic').exec(function (err, templates) {
        if (err) return next(err);
        res.json(templates);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    Template.findById(req.params.id, function (err, template) {
        if (err) return next(err);
        res.json(template);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    Template.create(req.body, function (err, template) {
        if (err) return next(err);
        res.json(template);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Template.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, template) {
        if (err) return next(err);
        res.json(template);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    Template.findByIdAndRemove(req.params.id, function (err, template) {
        if (err) return next(err);
        res.json(template);
    });
});

module.exports = router;
