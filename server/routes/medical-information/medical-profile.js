var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalProfile = require('./../../models/medical-information/medical-profile.model');

router.post('/info/:userid', function(req,res) {
    var medicalProfile = new MedicalProfile();
    var params = req.body;
    var userId = req.params.userid;

    medicalProfile.user=userId;
    medicalProfile.emergencyInfo=params.emergencyInfo;
    medicalProfile.overallProfile=params.overallProfile;
    medicalProfile.mentalHealth=params.mentalHealth;
    medicalProfile.overallVision=params.overallVision;
    medicalProfile.overallDental=params.overallDental;
    medicalProfile.currentProblems=params.currentProblems;
    medicalProfile.height=params.height;
    medicalProfile.weight=params.weight;
    medicalProfile.bloodPressure=params.bloodPressure;
    medicalProfile.pulseRate=params.pulseRate;
    medicalProfile.bloodType=params.bloodType;
    medicalProfile.vision=params.vision;
    medicalProfile.hearing=params.hearing;
    medicalProfile.notes=params.notes;
    medicalProfile.hereditaryConditions=params.hereditaryConditions;

    medicalProfile.save((err, medicalProfileStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalProfileStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalProfileStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalProfile.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});
            } else {
                res.status(200).send({medicalUpdated});
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalProfile.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});
            } else {
                res.status(200).send({medicalRemoved});
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=MedicalProfile.find({user: userId});
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
module.exports = router;
