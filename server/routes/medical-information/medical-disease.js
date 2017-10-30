var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalDisease = require('./../../models/medical-information/medical-disease.model');

router.post('/info/:userid', function(req,res) {
    var medicalDisease = new MedicalDisease();
    var params = req.body;
    var userId = req.params.userid;

    medicalDisease.user=userId;
    medicalDisease.name=params.name;
    medicalDisease.type=params.type;
    medicalDisease.diseaseVariation=params.diseaseVariation;
    medicalDisease.diagnosisDate=params.diagnosisDate;
    medicalDisease.source=params.source;
    medicalDisease.notesSymptoms=params.notesSymptoms;
    medicalDisease.exposed=params.exposed;
    medicalDisease.addedDiseaseInfo=params.addedDiseaseInfo;
    medicalDisease.prognosis=params.prognosis;
    medicalDisease.treatment=params.treatment;
    medicalDisease.physician=params.physician;
    medicalDisease.physicianPhone=params.physicianPhone;
    medicalDisease.addedMedicationIngo=params.addedMedicationIngo;

    medicalDisease.save((err, medicalDiseaseStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalDiseaseStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalDiseaseStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalDisease.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalDisease.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalDisease.find({user: userId});
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
