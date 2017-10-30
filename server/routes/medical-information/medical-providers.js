var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalProviders = require('./../../models/medical-information/medical-providers.model');

router.post('/info/:userid', function(req,res) {
    var medicalProviders = new MedicalProviders();
    var params = req.body;
    var userId = req.params.userid;

    medicalProviders.user=userId;
    medicalProviders.name=params.name;
    medicalProviders.organization=params.organization;
    medicalProviders.sepciality=params.sepciality;
    medicalProviders.website=params.website;
    medicalProviders.hospitalAffiliation=params.hospitalAffiliation;
    medicalProviders.addedProviderInfo=params.addedProviderInfo;
    medicalProviders.beganDate=params.beganDate;
    medicalProviders.stoppedDate=params.stoppedDate;
    medicalProviders.notesExperience=params.notesExperience;
    medicalProviders.medicalEducation=params.medicalEducation;
    medicalProviders.primaryPhone=params.primaryPhone;
    medicalProviders.fax=params.fax;
    medicalProviders.answeringService=params.answeringService;
    medicalProviders.email=params.email;
    medicalProviders.cellPhone=params.cellPhone;
    medicalProviders.homePhone=params.homePhone;
    medicalProviders.specialContactInfo=params.specialContactInfo;
    medicalProviders.officePhoneOne=params.officePhoneOne;
    medicalProviders.addedOfficeInfoOne=params.addedOfficeInfoOne;
    medicalProviders.cityOne=params.cityOne;
    medicalProviders.stateOne=params.stateOne;
    medicalProviders.zipCodeOne=params.zipCodeOne;
    medicalProviders.countryOne=params.countryOne;
    medicalProviders.notesOne=params.notesOne;
    medicalProviders.officePhoneTwo=params.officePhoneTwo;
    medicalProviders.addedOfficeInfoTwo=params.addedOfficeInfoTwo;
    medicalProviders.cityTwo=params.cityTwo;
    medicalProviders.stateTwo=params.stateTwo;
    medicalProviders.zipCodeTwo=params.zipCodeTwo;
    medicalProviders.countryTwo=params.countryTwo;
    medicalProviders.notesTwo=params.notesTwo;

    medicalProviders.save((err, medicalProvidersStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalProvidersStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalProvidersStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalProviders.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalProviders.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalProviders.find({user: userId});
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
