const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        currency: {
            type: String,
            required: true
        },
        amount: {
            type: Number,
            required: true
        }
    },
    colorsAvailable: {
        type: [String],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    style: {
        type: String
    },
    shipping: {
        type: String,
        required: true
    },
    addressOfSeller: {
        type: String
    },
    stockStatus: {
        type: String,
        enum: ['In Stock', 'Out of Stock'],
        default: 'In Stock'
    },
    numberInStock: {
        type: Number,
        required: true
    },
    images: {
        type: [String]
    },
    mainImage: {
        type: String,
        required: true
    },
    specifications: {
        type: [String],
        required: true
    }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;