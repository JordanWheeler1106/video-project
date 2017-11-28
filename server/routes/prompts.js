var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Prompt = require('./../models/prompt.model');

router.get('/', function(req, res, next) {
    Prompt.find(function (err, prompts) {
        if (err) return next(err);
        res.json(prompts);
    });
});

router.post('/batch', function(req, res, next) {
    Prompt.insertMany(req.body.prompts, function(err, prompts) {
      if(err) return next(err);
      res.json(prompts);
    })
});

router.post('/batch/delete', function(req, res, next) {
    Prompt.remove({'_id':{'$in':req.body.prompts}}, function(err, prompts) {
      if (err) return next(err);
      res.json(prompts);
    });
});

router.post('/', function(req, res){
  Prompt.create(req.body, function(err, prompt){
      if (err) return next(err);
      res.send(prompt);
  })
});

router.get('/all/:id', function(req, res){
    var id = req.params.id;
    if(id == 'root'){
        return res.send([]);
    }
    Prompt.find({folder: id}, function(err, prompts){
        if(err){
            return res.status(404).json({message: "not found"});
        }
        else{
            res.send(prompts);
        }
    })
})

router.post('/getAll', function(req, res){
    var ids = req.body.ids;
    Prompt.find({folder: { $in: ids}}, function(err, prompts){
        if(err){
            return res.status(404).json({message: "not found"});
        }
        else{
            res.send(prompts);
        }
    })
})

router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Prompt.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, prompt) {
        if (err) return next(err);
        res.json(prompt);
    });
});

router.delete('/:id', function(req, res){
    var id = req.params.id;
    Prompt.find({_id: id}).remove(function(err, prompt){
        if(err){
            return res.sendStatus(500);
        }
        else{
            res.send(prompt);
        }
    });
})

module.exports = router;
