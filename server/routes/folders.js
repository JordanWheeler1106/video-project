/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Folder = require('./../models/folder.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    Folder.find({userId: req.params.id}, function (err, folders) {
        if (err) return next(err);
        res.json(folders);
    });
});

router.get('/all/:id/:parentId', function(req, res, next) {
    Folder.find({userId: req.params.id, parentId: req.params.parentId}, function (err, folders) {
        if (err) return next(err);
        res.json(folders);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    Folder.findById(req.params.id, function (err, folder) {
        if (err) return next(err);
        res.json(folder);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    Folder.create(req.body, function (err, folder) {
        if (err) return next(err);
        res.json(folder);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Folder.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, folder) {
        if (err) return next(err);
        res.json(folder);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    Folder.findByIdAndRemove(req.params.id, function (err, folder) {
        if (err) return next(err);
        res.json(folder);
    });
});

module.exports = router;