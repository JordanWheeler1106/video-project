var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalConditions = require('./../../models/medical-information/medical-conditions.model');

router.post('/info/:userid', function(req,res) {
    var medicalConditions = new MedicalConditions();
    var params = req.body;
    var userId = req.params.userid;

    medicalConditions.user=userId;
    medicalConditions.name=params.name;
    medicalConditions.type=params.type;
    medicalConditions.conditionType=params.conditionType;
    medicalConditions.diagnosisDate=params.diagnosisDate;
    medicalConditions.source=params.source;
    medicalConditions.notes=params.notes;
    medicalConditions.prognosis=params.prognosis;
    medicalConditions.status=params.status;
    medicalConditions.treatment=params.treatment;
    medicalConditions.physician=params.physician;
    medicalConditions.physicianPhone=params.physicianPhone;

    medicalConditions.save((err, medicalConditionsStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalConditionsStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalConditionsStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalConditions.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalConditions.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalConditions.find({user: userId});
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
