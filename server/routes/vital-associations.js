/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalAssociations = require('./../models/vital-associations.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalAssociations.find({user: req.params.id}).exec(function (err, associations) {
        if (err) return next(err);
        res.json(associations);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalAssociations.findById(req.params.id, function (err, association) {
        if (err) return next(err);
        res.json(association);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalAssociations.create(req.body, function (err, association) {
        if (err) return next(err);
        res.json(association);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalAssociations.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, association) {
        if (err) return next(err);
        res.json(association);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalAssociations.findByIdAndRemove(req.params.id, function (err, association) {
        if (err) return next(err);
        res.json(association);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalAssociations.remove({'_id':{'$in':req.body.ids}}, function(err, association) {
      if (err) return next(err);
      res.json(association);
    });
});

router.post('/batch', function(req, res, next) {
    VitalAssociations.insertMany(req.body.data, function(err, associations) {
      if(err) return next(err);
      res.json(associations);
    })
});

router.post('/info/:userid', function(req,res) {
    var vitalAssociations = new VitalAssociations();
    var params = req.body;
    var userId = req.params.userid;

    vitalAssociations.user = userId;
    vitalAssociations.association=params.association,
    vitalAssociations.description= params.description,
    vitalAssociations.street = params.street;
    vitalAssociations.city = params.city;
    vitalAssociations.state = params.state;
    vitalAssociations.zipcode = params.zipcode;
    vitalAssociations.country = params.country;
    vitalAssociations.startDate = params.startDate;
    vitalAssociations.endDate = params.endDate;
    vitalAssociations.addedResponsibilitiesInfo=params.addedResponsibilitiesInfo,
    vitalAssociations.addedAddressInfo=params.addedAddressInfo,
    vitalAssociations.notes=params.notes,
    vitalAssociations.type = params.type
    
    vitalAssociations.save((err, vitalAssociationsStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!vitalAssociationsStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});                   
            } else {
                res.status(200).send({AssociationEntry: vitalAssociationsStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalAssociations.findByIdAndUpdate(infoId, update, (err, associationUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!associationUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});                   Í
            } else {
                res.status(200).send({AssociationEdited: associationUpdated});
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalAssociations.findByIdAndRemove(infoId, update, (err, associationRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!associationRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});                   
            } else {
                res.status(200).send({AssociationRemoved: associationRemoved});
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=VitalAssociations.find({user: userId});   
    find.exec((err, infoObtained)=>{
        if(err){
            res.status(500).send({message: 'There has been an error.'}); 
        } else {
            if(!infoObtained){
                res.status(404).send({message: 'There are no entries.'});
            } else {
                res.status(200).send({AssociationEntries: infoObtained}); 
            }
        }
    });
});

module.exports = router;