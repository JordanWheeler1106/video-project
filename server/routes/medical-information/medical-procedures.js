var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalProcedure = require('./../../models/medical-information/medical-procedures.model');

router.post('/info/:userid', function(req,res) {
    var medicalProcedure = new MedicalProcedure();
    var params = req.body;
    var userId = req.params.userid;

    medicalProcedure.user=userId;
    medicalProcedure.condition=params.condition;
    medicalProcedure.nameDescription=params.nameDescription;
    medicalProcedure.date=params.date;
    medicalProcedure.notes=params.notes;
    medicalProcedure.physician=params.physician;
    medicalProcedure.physicianPhone=params.physicianPhone;
    medicalProcedure.primaryCare=params.primaryCare;
    medicalProcedure.primaryCarePhone=params.primaryCarePhone;
    medicalProcedure.institution=params.institution;
    medicalProcedure.street=params.street;
    medicalProcedure.addedLocationInfo=params.addedLocationInfo;
    medicalProcedure.city=params.city;
    medicalProcedure.state=params.state;
    medicalProcedure.zipcode=params.zipcode;
    medicalProcedure.country=params.country;

    medicalProcedure.save((err, medicalProcedureStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalProcedureStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalProcedureStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalProcedure.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalProcedure.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalProcedure.find({user: userId});
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
