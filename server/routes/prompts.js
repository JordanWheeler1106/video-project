var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Prompt = require('./../models/prompt.model');

router.post('/', function(req, res){
    var id = req.body.id;
    var text = req.body.text;
    if(!id || id == null){
        return res.sendStatus(400);
    }
    var prompt = {
        text: text,
        folder: id
    }
    Prompt.create(prompt, function(err, prompt){
        if(err){
            return res.sendStatus(500);
        }
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