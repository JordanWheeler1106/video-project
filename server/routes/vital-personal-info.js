/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalPersonalInfo = require('./../models/vital-personal-info.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalPersonalInfo.find({user: req.params.id}).exec(function (err, personalinfos) {
        if (err) return next(err);
        res.json([personalinfos]);
    });
});

router.post('/info/:userid', function(req,res) {
    var vitalPersonalInfo = new VitalPersonalInfo();
    var params = req.body;
    var userId = req.params.userid;

    vitalPersonalInfo.user = userId;
    vitalPersonalInfo.birthDate = params.birthDate;
    vitalPersonalInfo.birthPlace = params.birthPlace;
    vitalPersonalInfo.deathDate = params.deathDate;
    vitalPersonalInfo.deathPlace = params.deathPlace;
    vitalPersonalInfo.gender = params.gender;
    vitalPersonalInfo.race = params.race;
    vitalPersonalInfo.priorNames = params.priorNames;
    vitalPersonalInfo.addedBasicInfo = params.addedBasicInfo;
    vitalPersonalInfo.addedCriticalInfo = params.addedCriticalInfo;
    vitalPersonalInfo.ethnicity = params.ethnicity;
    vitalPersonalInfo.notes = params.notes; 

    vitalPersonalInfo.save((err, vitalPersonalInfoStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!vitalPersonalInfoStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});                   
            } else {
                res.status(200).send([vitalPersonalInfoStored]);
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalPersonalInfo.findByIdAndUpdate(infoId, update, (err, vitalUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!vitalUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});                   
            } else {
                res.status(200).send([vitalUpdated]);
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalPersonalInfo.findByIdAndRemove(infoId, update, (err, vitalRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!vitalRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});                   
            } else {
                res.status(200).send({VitalInfo: vitalRemoved});
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=VitalPersonalInfo.find({user: userId});   
    find.exec((err, infoObtained)=>{
        if(err){
            res.status(500).send({message: 'There has been an error.'}); 
        } else {
            if(!infoObtained){
                res.status(404).send({message: 'There are no entries.'});
            } else {
                res.status(200).send([infoObtained[0]]);
            }
        }
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalPersonalInfo.findById(req.params.id, function (err, personalinfo) {
        if (err) return next(err);
        res.json(personalinfo);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalPersonalInfo.create(req.body, function (err, personalinfo) {
        if (err) return next(err);
        res.json(personalinfo);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalPersonalInfo.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, personalinfo) {
        if (err) return next(err);
        res.json(personalinfo);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalPersonalInfo.findByIdAndRemove(req.params.id, function (err, personalinfo) {
        if (err) return next(err);
        res.json(personalinfo);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalPersonalInfo.remove({'_id':{'$in':req.body.ids}}, function(err, personalinfo) {
      if (err) return next(err);
      res.json(personalinfo);
    });
});

router.post('/batch', function(req, res, next) {
    VitalPersonalInfo.insertMany(req.body.data, function(err, personalinfos) {
      if(err) return next(err);
      res.json(personalinfos);
    })
});

module.exports = router;