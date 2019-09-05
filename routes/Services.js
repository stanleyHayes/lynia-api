const express = require('express');

const router = express.Router();

const Service = require('../models/Service');

//purchase a token
router.post('/', function (req, res, next) {
    const service = {
        token: req.body.token,
        owner: req.body.owner,
        cost: req.body.cost,
        addOns: req.body.addOns,
        meta: req.body.meta
    };

    Service.create(service)
        .then(function (service) {
            res.status(201).send(service);
        }).catch(next); //error purchasing token in mongo database
});

//get a specific service with an id of servicedId
router.get('/:serviceId', function (req, res, next) {
    Service.findById(req.params.serviceId)
        .exec()
        .then(function (service) {
            if (!service) {
                return res.status(404).json({
                    message: "Resource not Found"
                })
            }
            res.send(200).json(service);
        }).catch(next); //error finding service in a database
});

//get all services
router.get('/', function (req, res, next) {
    Service.find({}).then(function (services) {
        res.status(200).send(services);
    }).catch(next); //error finding all services in mongo database
});
//get all services of a specific owner
//get all services with a specific status
router.get('/search', function (req, res, next) {
    if (req.query.status || req.query.owner) {
        Service.find({}).or([{
                status: req.query.status
            }, {
                owner: req.query.owner
            }])
            .exec()
            .then(function (services) {
                return res.status(200).send(services);
            }).catch(next); //error finding service in mongo database
    } //end else if
});

//activate a specific service with an id of serviceId
router.put('/:serviceId', function (req, res, next) {
    const serviceId = req.params.serviceId;
    Service.findById(serviceId)
        .exec()
        .then(function (service) {
            if (!service) {
                return res.status(404).json({
                    message: "Resource not Found"
                })
            }
            const status = req.body.status;

            //if new status is not equal to previous status of service
            if (status !== service.status) {
                //change the status of the service to the new status whether dormant or used
                service.status = status;
                //if the status of the
                if (status == 'USED') {
                    service.meta.dateActivated = Date.now();
                } //end inner if
            } //end outer if
            res.status(201).json(status);
        }).catch(next); //error finding service from mongo database
});

router.delete("/:serviceId", function (req, res, next) {
    Service.findByIdAndRemove(req.params.serviceId)
        .exec()
        .then(function (service) {
            res.status(204).send(service);
        }).catch(next); //error removing service from mongo database
});
module.exports = router;