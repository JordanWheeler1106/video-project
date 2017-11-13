var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalSurgeries = require('./../../models/medical-information/medical-surgeries.model');

router.post('/info/:userid', function(req,res) {
    var medicalSurgeries = new MedicalSurgeries();
    var params = req.body;
    var userId = req.params.userid;

    medicalSurgeries.user=userId;
    medicalSurgeries.surgeonName=params.surgeonName;
    medicalSurgeries.addedNamesInfo=params.addedNamesInfo;
    medicalSurgeries.description=params.description;
    medicalSurgeries.date=params.date;
    medicalSurgeries.street=params.street;
    medicalSurgeries.addedLocationInfo=params.addedLocationInfo;
    medicalSurgeries.city=params.city;
    medicalSurgeries.state=params.state;
    medicalSurgeries.country=params.country;
    medicalSurgeries.phone=params.phone;
    medicalSurgeries.notes=params.notes;
    medicalSurgeries.surgery=params.surgery;

    medicalSurgeries.save((err, medicalSurgeriesStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalSurgeriesStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send(medicalSurgeriesStored);
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalSurgeries.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalSurgeries.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalSurgeries.find({user: userId});
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
