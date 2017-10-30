var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalContacts = require('./../../models/medical-information/medical-contact.model');

router.post('/info/:userid', function(req,res) {
    var medicalContacts = new MedicalContacts();
    var params = req.body;
    var userId = req.params.userid;

    medicalContacts.user=userId;
    medicalContacts.namePrimary=params.namePrimary;
    medicalContacts.relationshipPrimary=params.relationshipPrimary;
    medicalContacts.cellphonePrimary=params.cellphonePrimary;
    medicalContacts.homephonePrimary=params.homephonePrimary;
    medicalContacts.officephonePrimary=params.officephonePrimary;
    medicalContacts.notesPrimary=params.notesPrimary;

    medicalContacts.nameSecondary=params.nameSecondary;
    medicalContacts.relationshipSecondary=params.relationshipSecondary;
    medicalContacts.cellphoneSecondary=params.cellphoneSecondary;
    medicalContacts.homephoneSecondary=params.homephoneSecondary;
    medicalContacts.officephoneSecondary=params.officephoneSecondary;
    medicalContacts.notesSecondary=params.notesSecondary;

    medicalContacts.nameThird=params.nameThird;
    medicalContacts.relationshipThird=params.relationshipThird;
    medicalContacts.cellphoneThird=params.cellphoneThird;
    medicalContacts.homephoneThird=params.homephoneThird;
    medicalContacts.officephoneThird=params.officephoneThird;
    medicalContacts.notesThird=params.notesThird;

    medicalContacts.save((err, medicalContactsStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalContactsStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalContactsStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalContacts.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalContacts.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalContacts.find({user: userId});
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
