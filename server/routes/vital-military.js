/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalMilitary = require('./../models/vital-military.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalMilitary.find({user: req.params.id}).exec(function (err, militarys) {
        if (err) return next(err);
        res.json(militarys);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalMilitary.findById(req.params.id, function (err, military) {
        if (err) return next(err);
        res.json(military);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalMilitary.create(req.body, function (err, military) {
        if (err) return next(err);
        res.json(military);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalMilitary.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, military) {
        if (err) return next(err);
        res.json(military);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalMilitary.findByIdAndRemove(req.params.id, function (err, military) {
        if (err) return next(err);
        res.json(military);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalMilitary.remove({'_id':{'$in':req.body.ids}}, function(err, military) {
      if (err) return next(err);
      res.json(military);
    });
});

router.post('/batch', function(req, res, next) {
    VitalMilitary.insertMany(req.body.data, function(err, militarys) {
      if(err) return next(err);
      res.json(militarys);
    })
});

router.post('/info/:userid', function(req,res) {
    var vitalMilitary = new VitalMilitary();
    var params = req.body;
    var userId = req.params.userid;

    vitalMilitary.user = userId;
    vitalMilitary.startDate = params.startDate;
    vitalMilitary.endDate = params.endDate;
    vitalMilitary.zipcode = params.zipcode;
    vitalMilitary.country = params.country;
    vitalMilitary.city = params.city;
    vitalMilitary.state = params.state;
    vitalMilitary.street = params.street;
    vitalMilitary.addedAddressInfo = params.addedAddressInfo;
    vitalMilitary.unit = params.unit;
    vitalMilitary.responsibilities = params.responsibilities;
    vitalMilitary.promotions = params.promotions;
    vitalMilitary.addedCommendationsInfo = params.addedCommendationsInfo;
    vitalMilitary.addedPromotionInfo = params.addedPromotionInfo;
    vitalMilitary.addedRankInfo = params.addedRankInfo;
    vitalMilitary.rank = params.rank;
    vitalMilitary.commendations = params.commendations;
    vitalMilitary.notes = params.notes;

    vitalMilitary.save((err, vitalMilitaryStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!vitalMilitaryStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send(vitalMilitaryStored);
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalMilitary.findByIdAndUpdate(infoId, update, (err, militaryUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!militaryUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});
            } else {
                res.status(200).send(militaryUpdated);
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalMilitary.findByIdAndRemove(infoId, update, (err, militaryRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!militaryRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});
            } else {
                res.status(200).send(militaryRemoved);
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=VitalMilitary.find({user: userId});
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
