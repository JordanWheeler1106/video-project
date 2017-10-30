var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalMedication = require('./../../models/medical-information/medical-medication.model');

router.post('/info/:userid', function(req,res) {
    var medicalMedication = new MedicalMedication();
    var params = req.body;
    var userId = req.params.userid;

    medicalMedication.user=userId;
    medicalMedication.condition=params.condition;
    medicalMedication.physcian=params.physcian;
    medicalMedication.physcianPhone=params.physcianPhone;
    medicalMedication.notes=params.notes;
    medicalMedication.nameMedication=params.nameMedication;
    medicalMedication.dosage=params.dosage;
    medicalMedication.frequency=params.frequency;
    medicalMedication.medicationNotes=params.medicationNotes;

    medicalMedication.save((err, medicalMedicationStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalMedicationStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalMedicationStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalMedication.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalMedication.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalMedication.find({user: userId});
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
