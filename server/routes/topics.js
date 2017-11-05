/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Topic = require('./../models/topic.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all', function(req, res, next) {
    Topic.find({}, function (err, topics) {
        if (err) return next(err);
        res.json(topics);
    });
});

router.get('/all/:id', function(req, res){
    Topic.find({userId: req.params.id}, function(err, topics){
        if(err){
            return res.status(404).json({message: "not found"});
        }
        else{
            res.send(topics);
        }
    })
})

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    Topic.findById(req.params.id, function (err, topic) {
        if (err) return next(err);
        res.json(topic);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    Topic.create(req.body, function (err, topic) {
        if (err) return next(err);
        res.json(topic);
    })
});

router.post('/batch', function(req, res, next) {
    Topic.insertMany(req.body.topics, function(err, topics) {
      if(err) return next(err);
      res.json(topics);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Topic.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, topic) {
        if (err) return next(err);
        res.json(topic);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    Topic.findByIdAndRemove(req.params.id, function (err, topic) {
        if (err) return next(err);
        res.json(topic);
    });
});

module.exports = router;
