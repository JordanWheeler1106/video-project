var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalInsurance = require('./../../models/medical-information/medical-insurance.model');

router.post('/info/:userid', function(req,res) {
    var medicalInsurance = new MedicalInsurance();
    var params = req.body;
    var userId = req.params.userid;

    medicalInsurance.user=userId;
    medicalInsurance.coverageType=params.coverageType;
    medicalInsurance.coverageRole=params.coverageRole;
    medicalInsurance.company=params.company;
    medicalInsurance.policyNumber=params.policyNumber;
    medicalInsurance.beganDate=params.beganDate;
    medicalInsurance.endDate=params.endDate;
    medicalInsurance.notes=params.notes;
    medicalInsurance.fullCompanyName=params.fullCompanyName;
    medicalInsurance.street=params.street;
    medicalInsurance.type=params.type;
    medicalInsurance.addedCompanyInfo=params.addedCompanyInfo;
    medicalInsurance.city=params.city;
    medicalInsurance.state=params.state;
    medicalInsurance.zipcode=params.zipcode;
    medicalInsurance.country=params.country;
    medicalInsurance.companyNotes=params.companyNotes;
    medicalInsurance.phone=params.phone;
    medicalInsurance.email=params.email;
    medicalInsurance.insuranceAgencyName=params.insuranceAgencyName;
    medicalInsurance.insuranceAgent=params.insuranceAgent;
    medicalInsurance.insuranceAgentPhone=params.insuranceAgentPhone;
    medicalInsurance.insuranceAgentNotes=params.insuranceAgentNotes;

    medicalInsurance.save((err, medicalInsuranceStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalInsuranceStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalInsuranceStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalInsurance.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalInsurance.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalInsurance.find({user: userId});
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
