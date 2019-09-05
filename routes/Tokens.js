const express = require('express');

const router = express.Router();

const Token = require('../models/Token');

//create a new token
router.post('/', function (req, res, next) {
    const token = {
        image: req.body.image,
        owner: req.body.owner,
        addOns: req.body.addOns,
        type: req.body.type,
        serviceAvailability: req.body.serviceAvailability,
        servicePackage: req.body.servicePackage,
        description: req.body.description,
        additionalSecurity: req.body.additionalSecurity,
        usage: req.body.usage,
        pricing: req.body.pricing,
        dormantMode: req.body.dormantMode
    };

    Token.create(token).then(function (token) {
        res.status(201).send(token);
    }).catch(next); ///error for creating token in mongo database
});

//get a token with id tokenId
router.get('/:tokenId', function (req, res, next) {
    Token.findById(req.params.tokenId)
        .exec()
        .then(function (token) {
            if (!token) {
                res.status(404).send({
                    message: "Token not found"
                });
            } else {
                res.status(200).send(token);
            }
        }).catch(next); //error for finding token in mongo database
});

//edit a token with id tokenId
router.put('/:tokenId', function (req, res, next) {
    const token = {
        owner: req.body.owner,
        addOns: req.body.addOns,
        type: req.body.type,
        serviceAvailability: req.body.serviceAvailability,
        servicePackage: req.body.servicePackage,
        description: req.body.description,
        additionalSecurity: req.body.additionalSecurity,
        usage: req.body.usage,
        pricing: req.body.pricing,
        dormantMode: req.body.dormantMode,
        available: req.body.available
    };

    Token.findByIdAndUpdate(req.params.tokenId, token, {
            new: true
        })
        .exec()
        .then(function (token) {
            res.status(201).send(token);
        })
        .catch(next); //error for updating token in mongo database
});

//get all tokens
router.get('/', function (req, res, next) {
    Token.find({})
        .exec()
        .then(function (tokens) {
            res.status(200).send(tokens);
        }).catch(next); //error for finding tokens in mongo database
});

//get all tokens of a particular user
router.get('/', function (req, res, next) {
    const owner = req.query.owner;
    Token.find({
            owner: owner
        })
        .exec()
        .then(function (tokens) {
            res.status(201).send(tokens);
        }).catch(next); //error for finding tokens of specific owner in mongo database
});

//delete a token with id tokenId
router.delete('/:tokenId', function (req, res, next) {
    Token.findOneAndDelete(req.params.tokenId)
        .exec()
        .then(function (token) {
            res.status(200).send(token);
        }).catch(next); //error for deleting token from mongo database
});

module.exports = router;