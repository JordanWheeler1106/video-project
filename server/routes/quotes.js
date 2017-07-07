/**
 * Created by UmairAhmed on 6/14/2017.
 */


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Quote = require('./../models/quote.model');

//TODO create auth middleware for checking authorizations.

/* GET ALL NuggetS */
router.get('/all', function(req, res, next) {
    Quote.find({}, function (err, quotes) {
        if (err) return next(err);
        res.json(quotes);
    });
});

/* GET SINGLE Nugget BY ID */
router.get('/:id', function(req, res, next) {
    Quote.findById(req.params.id, function (err, quote) {
        if (err) return next(err);
        res.json(quote);
    });
});

/* SAVE Nugget */
router.post('/', function(req, res, next) {
    Quote.create(req.body, function (err, quote) {
        if (err) return next(err);
        res.json(quote);
    })
});

/* UPDATE Nugget */
router.put('/:id', function(req, res, next) {
    if(req.body._id) delete req.body._id;
    Quote.findByIdAndUpdate(req.params.id, req.body, {new : true}, function (err, quote) {
        if (err) return next(err);
        res.json(quote);
    });
});

/* DELETE Nugget */
router.delete('/:id', function(req, res, next) {
    Quote.findByIdAndRemove(req.params.id, function (err, quote) {
        if (err) return next(err);
        res.json(quote);
    });
});

module.exports = router;