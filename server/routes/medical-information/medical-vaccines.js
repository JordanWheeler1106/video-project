var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MedicalVaccines = require('./../../models/medical-information/medical-vaccines.model');

router.post('/info/:userid', function(req,res) {
    var medicalVaccines = new MedicalVaccines();
    var params = req.body;
    var userId = req.params.userid;

    medicalVaccines.user=userId;
    medicalVaccines.reasons=params.reasons;
    medicalVaccines.name=params.name;
    medicalVaccines.notes=params.notes;
    medicalVaccines.dateGiven=params.dateGiven;
    medicalVaccines.period=params.period;
    medicalVaccines.dueAgain=params.dueAgain;
    medicalVaccines.type=params.type;

    medicalVaccines.save((err, medicalVaccinesStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!medicalVaccinesStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({medicalVaccinesStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    MedicalVaccines.findByIdAndUpdate(infoId, update, (err, medicalUpdated) =>{
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

    MedicalVaccines.findByIdAndRemove(infoId, update, (err, medicalRemoved) =>{
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
    var find=MedicalVaccines.find({user: userId});
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
