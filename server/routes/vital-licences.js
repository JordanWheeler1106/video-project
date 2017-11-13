/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalLicences = require('./../models/vital-licences.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalLicences.find({user: req.params.id}).exec(function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalLicences.findById(req.params.id, function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalLicences.create(req.body, function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalLicences.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalLicences.findByIdAndRemove(req.params.id, function (err, licences) {
        if (err) return next(err);
        res.json(licences);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalLicences.remove({'_id':{'$in':req.body.ids}}, function(err, licences) {
      if (err) return next(err);
      res.json(licences);
    });
});

router.post('/batch', function(req, res, next) {
    VitalLicences.insertMany(req.body.data, function(err, licences) {
      if(err) return next(err);
      res.json(licences);
    })
});
router.post('/info/:userid', function(req,res) {
    var vitalLicences = new VitalLicences();
    var params = req.body;
    var userId = req.params.userid;

    vitalLicences.user = userId;
    vitalLicences.city = params.city;
    vitalLicences.authority = params.authority;
    vitalLicences.grantedDate = params.grantedDate;
    vitalLicences.state = params.state;
    vitalLicences.zipcode = params.zipcode;
    vitalLicences.country = params.country;
    vitalLicences.type = params.type;
    vitalLicences.address = params.address;
    vitalLicences.addedAddressInfo = params.addedAddressInfo;
    vitalLicences.pobox = params.pobox;
    vitalLicences.notes = params.notes;
    vitalLicences.term = params.term;

    vitalLicences.save((err, vitalLicencesStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!vitalLicencesStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send(vitalLicencesStored);
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalLicences.findByIdAndUpdate(infoId, update, (err, licencesUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!licencesUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});
            } else {
                res.status(200).send(licencesUpdated);
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalLicences.findByIdAndRemove(infoId, update, (err, licenceRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!licenceRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});
            } else {
                res.status(200).send(licenceRemoved);
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=VitalLicences.find({user: userId});
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
