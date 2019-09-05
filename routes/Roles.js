const express = require('express');

const router = express.Router();
const Role = require('../models/Role');

//CREATES A NEW ROLE
router.post('/', function(req, res, next){
    let role = {
        type: req.body.type,
        name: req.body.name,
        permissions: req.body.permissions
    };
    Role.create(role).then(function(role){
        console.log(role);
        res.status(201).send(role);
    }).catch(next);
});

//EDIT AN EXISTING ROLE WITH AN type OF type
router.put('/:type', function(req, res, next){
    let role = {
        type: req.body.type,
        name: req.body.name,
        permissions: req.body.permissions
    };
    Role.findOneAndUpdate({type: req.params.type},role, {new: true, useFindAndModify: false}).then(function(role){
        console.log(role);
        res.status(201).send(role);
    }).catch(next);
});

//GET ALL ROLES
router.get('/', function(req, res, next){
    Role.find({})
    .exec()
    .then(function(roles){
        res.status(200).send(roles)
    })
    .catch(next);
});

//GET ROLE WITH type OF type
router.get('/:type', function(req, res, next){
    Role.find({type: req.params.type})
    .exec()
    .then(function(role){
        res.status(200).send(role);
    }).catch(next);
});

//DELETE ROLE WITH type OF type
router.delete('/:type', function(req, res, next){
    Role.findOneAndRemove({type: req.params.type})
    .exec()
    .then(function(role){
        res.status(200).send(role);
    })
    .catch(next);
});

module.exports = router;