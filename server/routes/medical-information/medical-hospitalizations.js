var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalHospitalizations = require('./../../models/medical-information/medical-hospitalizations.model');

router.post('/info/:userid', function(req,res) {
    var medicalHospitalizations = new MedicalHospitalizations();
    var params = req.body;
    var userId = req.params.userid;

    medicalHospitalizations.user=userId;
    medicalHospitalizations.nameHospital=params.nameHospital;
    medicalHospitalizations.reason=params.reason;
    medicalHospitalizations.notes=params.nanotesmeHospital;
    medicalHospitalizations.admissionDate=params.admissionDate;
    medicalHospitalizations.dischargeDate=params.dischargeDate;
    medicalHospitalizations.physician=params.physician;
    medicalHospitalizations.physicianPhone=params.physicianPhone;
    medicalHospitalizations.street=params.street;
    medicalHospitalizations.addedLocationInfo=params.addedLocationInfo;
    medicalHospitalizations.city=params.city;
    medicalHospitalizations.state=params.state;
    medicalHospitalizations.zipcode=params.zipcode;
    medicalHospitalizations.country=params.country;

    medicalHospitalizations.save((err, medicalHospitalizationsStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalHospitalizationsStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalHospitalizationsStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalHospitalizations.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalHospitalizations.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalHospitalizations.find({user: userId});
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
