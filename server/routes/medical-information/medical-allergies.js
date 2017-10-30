var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalAllergies = require('./../../models/medical-information/medical-allergies.model');

router.post('/info/:userid', function(req,res) {
    var medicalAllergies = new MedicalAllergies();
    var params = req.body;
    var userId = req.params.userid;

    medicalAllergies.user=userId;
    medicalAllergies.name=params.name;
    medicalAllergies.type=params.type;
    medicalAllergies.symptoms=params.symptoms;
    medicalAllergies.diegnosedDate=params.diegnosedDate;
    medicalAllergies.diagnosedAge=params.diagnosedAge;
    medicalAllergies.currentStatus=params.currentStatus;
    medicalAllergies.treatment=params.treatment;
    medicalAllergies.medication=params.medication;
    medicalAllergies.addedStatusInfo=params.addedStatusInfo;

    medicalAllergies.save((err, medicalAllergiesStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalAllergiesStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalAllergiesStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalAllergies.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalAllergies.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalAllergies.find({user: userId});
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
