const express = require('express');

const router = express.Router();

const Product = require('../models/Product');

//create a new product
router.post('/', async function (req, res, next) {
    try {
        const product = {
            name: req.body.name,
            description: req.body.description,
            specification: req.body.specification,
            price: req.body.price,
            colorsAvailable: req.body.colorsAvailable,
            category: req.body.category,
            type: req.body.type,
            style: req.body.style,
            shipping: req.body.shipping,
            addressOfSeller: req.body.addressOfSeller,
            stockStatus: req.body.stockStatus,
            numberInStock: req.body.numberInStock,
            mainImage: req.body.mainImage,
        };

        const createdProductFromDB = await Product.create(product);

        res.status(201).json({
            message: 'Product Created Successfully',
            data: createdProductFromDB
        });
    } catch (error) {
        res.status(500).error()
    }


});

//edit a product
router.put('/:productId', async function (req, res, next) {

});

//get all products
router.get('/', async function (req, res, next) {

});

//get a specific product
router.get('/:productId', async function (req, res, next) {

});

router.delete('/:productId', async function (req, res, next) {

});

module.exports = router;