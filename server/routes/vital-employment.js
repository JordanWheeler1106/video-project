/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalEmployment = require('./../models/vital-employment.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalEmployment.find({user: req.params.id}).exec(function (err, employments) {
        if (err) return next(err);
        res.json(employments);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalEmployment.findById(req.params.id, function (err, employment) {
        if (err) return next(err);
        res.json(employment);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalEmployment.create(req.body, function (err, employment) {
        if (err) return next(err);
        res.json(employment);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalEmployment.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, employment) {
        if (err) return next(err);
        res.json(employment);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalEmployment.findByIdAndRemove(req.params.id, function (err, employment) {
        if (err) return next(err);
        res.json(employment);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalEmployment.remove({'_id':{'$in':req.body.ids}}, function(err, employment) {
      if (err) return next(err);
      res.json(employment);
    });
});

router.post('/batch', function(req, res, next) {
    VitalEmployment.insertMany(req.body.data, function(err, employments) {
      if(err) return next(err);
      res.json(employments);
    })
});

router.post('/info/:userid', function(req,res) {
    var vitalEmployment = new VitalEmployment();
    var params = req.body;
    var userId = req.params.userid;

    vitalEmployment.user = userId;
    vitalEmployment.company = params.company;
    vitalEmployment.branch = params.branch;
    vitalEmployment.title = params.title;
    vitalEmployment.street = params.street;
    vitalEmployment.city = params.city;
    vitalEmployment.state = params.state;
    vitalEmployment.zipcode = params.zipcode;
    vitalEmployment.country = params.country;
    vitalEmployment.industryType = params.industryType;
    vitalEmployment.startDate = params.startDate;
    vitalEmployment.endDate = params.endDate;
    vitalEmployment.addedAddressInfo = params.addedAddressInfo;
    vitalEmployment.addedEmployerInfo = params.addedEmployerInfo;
    vitalEmployment.county = params.county;
    vitalEmployment.employerNotes = params.employerNotes;
    vitalEmployment.employerNotes = params.employmentNotes;

    vitalEmployment.save((err, vitalEmploymentStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!vitalEmploymentStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send(vitalEmploymentStored);
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalEmployment.findByIdAndUpdate(infoId, update, (err, employmentUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!employmentUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});
            } else {
                res.status(200).send(employmentUpdated);
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalEmployment.findByIdAndRemove(infoId, update, (err, employmentRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!employmentRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});
            } else {
                res.status(200).send(employmentRemoved);
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=VitalEmployment.find({user: userId});
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
