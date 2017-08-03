var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Note = require('./../models/note.model');

router.post('/batch', function(req, res, next) {
    Note.insertMany(req.body.notes, function(err, notes) {
      if(err) return next(err);
      res.json(notes);
    })
});

router.post('/', function(req, res){
    var id = req.body.id;
    var text = req.body.text;
    if(!id || id == null){
        return res.sendStatus(400);
    }
    var note = {
        text: text,
        folder: id
    }
    Note.create(note, function(err, note){
        if(err){
            return res.sendStatus(500);
        }
        res.send(note);
    })
});

router.get('/all/:id', function(req, res){
    var id = req.params.id;
    if(id == 'root'){
        return res.send([]);
    }
    Note.find({folder: id}, function(err, notes){
        if(err){
            return res.status(404).json({message: "not found"});
        }
        else{
            res.send(notes);
        }
    })
})

router.post('/getAll', function(req, res){
    var ids = req.body.ids;
    Note.find({folder: { $in: ids}}, function(err, prompts){
        if(err){
            return res.status(404).json({message: "not found"});
        }
        else{
            res.send(prompts);
        }
    })
})

router.delete('/:id', function(req, res){
    var id = req.params.id;
    Note.find({_id: id}).remove(function(err, prompt){
        if(err){
            return res.sendStatus(500);
        }
        else{
            res.send(prompt);
        }
    });
})

module.exports = router;