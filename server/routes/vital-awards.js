/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalAwards = require('./../models/vital-awards.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalAwards.find({user: req.params.id}).exec(function (err, awards) {
        if (err) return next(err);
        res.json(awards);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalAwards.findById(req.params.id, function (err, award) {
        if (err) return next(err);
        res.json(award);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalAwards.create(req.body, function (err, award) {
        if (err) return next(err);
        res.json(award);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalAwards.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, award) {
        if (err) return next(err);
        res.json(award);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalAwards.findByIdAndRemove(req.params.id, function (err, award) {
        if (err) return next(err);
        res.json(award);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalAwards.remove({'_id':{'$in':req.body.ids}}, function(err, award) {
      if (err) return next(err);
      res.json(award);
    });
});

router.post('/batch', function(req, res, next) {
    VitalAwards.insertMany(req.body.data, function(err, awards) {
      if(err) return next(err);
      res.json(awards);
    })
});

router.post('/info/:userid', function(req,res) {
    var vitalAwards = new VitalAwards();
    var params = req.body;
    var userId = req.params.userid;

    vitalAwards.user = userId;
    vitalAwards.organization=params.organization,
    vitalAwards.description=params.description,
    vitalAwards.date=params.date,
    vitalAwards.notes=params.notes,
    vitalAwards.type = params.type
    
    
    vitalAwards.save((err, vitalAwardsStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!vitalAwardsStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});                   
            } else {
                res.status(200).send(vitalAwardsStored);
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalAwards.findByIdAndUpdate(infoId, update, (err, awardsUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!awardsUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});                   Í
            } else {
                res.status(200).send(awardsUpdated);
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalAwards.findByIdAndRemove(infoId, update, (err, awardsRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!awardsRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});                   
            } else {
                res.status(200).send(awardsRemoved);
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=VitalAwards.find({user: userId});   
    find.exec((err, infoObtained)=>{
        if(err){
            res.status(500).send({message: 'There has been an error.'}); 
        } else {
            if(!infoObtained){
                res.status(404).send({message: 'There are no entries.'});
            } else {
                res.status(200).send(infoObtained);
            }
        }
    });
});

module.exports = router;