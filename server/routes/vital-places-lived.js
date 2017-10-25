/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var VitalPlacesLived = require('./../models/vital-places-lived.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all/:id', function(req, res, next) {
    VitalPlacesLived.find({user: req.params.id}).exec(function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    VitalPlacesLived.findById(req.params.id, function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    VitalPlacesLived.create(req.body, function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    VitalPlacesLived.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    VitalPlacesLived.findByIdAndRemove(req.params.id, function (err, placeslived) {
        if (err) return next(err);
        res.json(placeslived);
    });
});

router.post('/batch/delete', function(req, res, next) {
    VitalPlacesLived.remove({'_id':{'$in':req.body.ids}}, function(err, placeslived) {
      if (err) return next(err);
      res.json(placeslived);
    });
});

router.post('/batch', function(req, res, next) {
    VitalPlacesLived.insertMany(req.body.data, function(err, placeslived) {
      if(err) return next(err);
      res.json(placeslived);
    })
});

router.post('/info/:userid', function(req,res) {
    var vitalPlacesLived = new VitalPlacesLived();
    var params = req.body;
    var userId = req.params.userid;

    vitalPlacesLived.user = userId;
    vitalPlacesLived.street = params.street;
    vitalPlacesLived.city = params.city;
    vitalPlacesLived.state = params.state;
    vitalPlacesLived.zipcode = params.zipcode;
    vitalPlacesLived.country = params.country;
    vitalPlacesLived.county = params.county;
    vitalPlacesLived.addedResidenceInfo = params.addedResidenceInfo;
    vitalPlacesLived.type = params.type;
    vitalPlacesLived.startDate = params.startDate;
    vitalPlacesLived.endDate = params.endDate;
    vitalPlacesLived.notes = params.notes;

    vitalPlacesLived.save((err, vitalPlacesLivedStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});               
        } else {
            if(!vitalPlacesLivedStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({PlacesLivedEntry: vitalPlacesLivedStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalPlacesLived.findByIdAndUpdate(infoId, update, (err, placesUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!placesUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});
            } else {
                res.status(200).send({PlacesLived: placesUpdated});
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    VitalPlacesLived.findByIdAndRemove(infoId, update, (err, placesRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!placesRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});
            } else {
                res.status(200).send({PlacesLivedRemoved: placesRemoved});
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=VitalPlacesLived.find({user: userId});
    find.exec((err, infoObtained)=>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!infoObtained){
                res.status(404).send({message: 'There are no entries.'});
            } else {
                res.status(200).send({PlacesLived: infoObtained});
            }
        }
    });

});


module.exports = router;
