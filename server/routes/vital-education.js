/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalEducation = require('./../models/vital-education.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalEducation.find({user: req.params.id}).exec(function (err, educations) {
        if (err) return next(err);
        res.json(educations);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalEducation.findById(req.params.id, function (err, education) {
        if (err) return next(err);
        res.json(education);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalEducation.create(req.body, function (err, education) {
        if (err) return next(err);
        res.json(education);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalEducation.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, education) {
        if (err) return next(err);
        res.json(education);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalEducation.findByIdAndRemove(req.params.id, function (err, education) {
        if (err) return next(err);
        res.json(education);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalEducation.remove({'_id':{'$in':req.body.ids}}, function(err, education) {
      if (err) return next(err);
      res.json(education);
    });
});

router.post('/batch', function(req, res, next) {
    VitalEducation.insertMany(req.body.data, function(err, educations) {
      if(err) return next(err);
      res.json(educations);
    })
});

router.post('/info/:userid', function(req,res) {
    var vitalEducation = new VitalEducation();
    var params = req.body;
    var userId = req.params.userid;

    vitalEducation.user=userId;
    vitalEducation.school = params.school;
    vitalEducation.major = params.major;
    vitalEducation.awards = params.awards;
    vitalEducation.street = params.street;
    vitalEducation.city = params.city;
    vitalEducation.state = params.state;
    vitalEducation.zipcode = params.zipcode;
    vitalEducation.country = params.country;
    vitalEducation.type = params.type;
    vitalEducation.startDate = params.startDate;
    vitalEducation.endDate = params.endDate;
    vitalEducation.schoolDescription = params.schoolDescription;
    vitalEducation.diploma = params.diploma;
    vitalEducation.addedSchoolAddresInfo = params.addedSchoolAddresInfo;
    vitalEducation.others = params.others;
    vitalEducation.addedMajorInfo = params.addedMajorInfo,
    vitalEducation.addedDiplomaInfo = params.addedDiplomaInfo,
    vitalEducation.addedAwardsInfo = params.addedAwardsInfo,
    vitalEducation.addedOtherInfo = params.addedOtherInfo,
    vitalEducation.addedExtracurricularInfo = params.addedExtracurricularInfo,
    vitalEducation.notes = params.notes;
    vitalEducation.save((err, vitalEducationStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!vitalEducationStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send(vitalEducationStored);
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalEducation.findByIdAndUpdate(infoId, update, (err, educationUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!educationUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});
            } else {
                res.status(200).send({EducationUpdated: educationUpdated});
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalEducation.findByIdAndRemove(infoId, update, (err, educationRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!educationRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});
            } else {
                res.status(200).send({EducationRemoved: educationRemoved});
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=VitalEducation.find({user: userId});
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
