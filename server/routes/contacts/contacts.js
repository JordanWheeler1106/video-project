var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Contact = require('./../../models/contact/contact.model');

router.post('/info/:userid', function(req,res) {
    var contact = new Contact();
    var params = req.body;
    var userId = req.params.userid;

    contact.user=userId;
    contact.contactName=params.contactName;

    var relationship = params.relationship;
    var relationshipArray = relationship.split(',');
    for(var i = 0, len = relationshipArray.length; i<len; i++){
        relationshipArray[i] = relationshipArray[i].trim();
    }
    contact.relationship = relationshipArray;

    contact.email=params.email;
    contact.addedEmailInfo=params.addedEmailInfo;
    contact.phone=params.phone;
    contact.addedPhoneInfo=params.addedPhoneInfo;
    contact.street=params.street;
    contact.addedStreetInfo=params.addedStreetInfo;
    contact.city=params.city;
    contact.state=params.state;
    contact.addedAddressInfo=params.addedAddressInfo;
    contact.dateBirth=params.dateBirth;
    contact.placeBirth=params.placeBirth;
    contact.gender=params.gender;
    contact.race=params.race;
    contact.ethnicity=params.ethnicity;
    contact.bioNotes=params.bioNotes;
    contact.causeDeath=params.causeDeath;
    contact.placeDeath=params.placeDeath;
    contact.religion=params.religion;
    contact.primaryPlaceOfLife=params.primaryPlaceOfLife;
    contact.spouseName=params.spouseName;
    contact.addedSpouseInfo=params.addedSpouseInfo;
    contact.childName=params.childName;
    contact.addedChildInfo=params.addedChildInfo;
    contact.parentName=params.parentName;
    contact.siblingName=params.siblingName;
    contact.addedParentInfo=params.addedParentInfo;
    contact.addedSiblingInfo=params.addedSiblingInfo;
    contact.education=params.education;
    contact.employment=params.employment;
    contact.military=params.military;
    contact.social=params.social;
    contact.miscellaneous=params.miscellaneous;

    contact.save((err, contactsStored) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!contactsStored){
                res.status(404).send({message: 'The information couldn\'t be saved.'});
            } else {
                res.status(200).send({contactsStored});
            }
        }
    });
});

router.put('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;
    var updateRelationships = update.relationship.split(',');
    for(var a = 0, len = updateRelationships.length; a<len; a++){
        updateRelationships[a] = updateRelationships[a].trim();
    }
    update.relationship = updateRelationships;
    Contact.findByIdAndUpdate(infoId, update, (err, contactUpdated) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!contactUpdated){
                res.status(404).send({message: 'The information couldn\'t be updated.'});
            } else {
                res.status(200).send({contactUpdated});
            }
        }
    });
});

router.delete('/info/:infoid', function(req, res){
    var infoId = req.params.infoid;
    var update = req.body;

    Contact.findByIdAndRemove(infoId, update, (err, contactRemoved) =>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!contactRemoved){
                res.status(404).send({message: 'The information couldn\'t be deleted.'});
            } else {
                res.status(200).send({contactRemoved});
            }
        }
    });
});

router.get('/info/all/:userid', function(req, res){
    var userId=req.params.userid;
    var find=Contact.find({user: userId});
    find.exec((err, infoObtained)=>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!infoObtained){
                res.status(404).send({message: 'There are no entries.'});
            } else {
                res.status(200).send({infoObtained});
            }
        }
    });
});

router.get('/info/relationships/:userid', function(req, res){
    var userId=req.params.userid;
    var find=Contact.find({user: userId}).distinct('relationship');
    find.exec((err, infoObtained)=>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!infoObtained){
                res.status(404).send({message: 'There are no entries.'});
            } else {

                res.status(200).send({infoObtained});
            }
        }
    });
});

router.get('/info/:infoid', function(req, res){
    var infoId=req.params.infoid;
    var find=Contact.find({_id: infoId});
    find.exec((err, infoObtained)=>{
        if(err){
            res.status(500).send({message: 'There has been an error.'});
        } else {
            if(!infoObtained){
                res.status(404).send({message: 'There are no entries.'});
            } else {
                var relationshipString = infoObtained[0].relationship.join();
                var r = {
                  rel: relationshipString,
                  infoObtained: infoObtained[0]
                }
                res.status(200).send(r); 
            }
        }
    });
});


module.exports = router;
