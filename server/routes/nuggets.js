/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Nugget = require('./../models/nugget.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/audio/:id', function(req, res, next) {
  var WebSocket = require('ws');
  
  var ws = new WebSocket('ws://169.46.27.138:8080/stream');
  
  ws.on('message', function incoming(data) {
    console.log(data);
    var result = JSON.parse(data);
    switch(result.action) {
      case "connected":
        var command = {
        	"action" : "clientResponse",
        	"message" : "connected",
        	"user" : req.params.id
        }
        ws.send(JSON.stringify(command));
        break;
      case "ready":
        var command = {
        	"action": "configure"
        }
        ws.send(JSON.stringify(command));
        break;
      case "configured":
        var command = {
            "continuous": true,
            "timestamps": true,
            "content-type": "audio/l16;rate=16000;channels=1",
            "smart_formatting": true,
            "profanity_filter": true,
            "interim_results": true,
            "action": "start"
        }
        ws.send(JSON.stringify(command));
        break;
      case "streamReady":
        res.send({result: true})
        break;
    }  
  });  
});

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

router.post('/batch', function(req, res, next) {
    Nugget.insertMany(req.body.nuggets, function(err, nuggets) {
      if(err) return next(err);
      res.json(nuggets);
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

router.post('/batch/delete', function(req, res, next) {
    Nugget.remove({'_id':{'$in':req.body.nuggets}}, function(err, nugget) {
      if (err) return next(err);
      res.json(nugget);
    });
});

module.exports = router;