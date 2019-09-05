const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ServiceSchema = new Schema({
    token: {
        type: Schema.Types.ObjectId,
        ref: "Token",
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        default: "ACTIVE",
        enum: ["USED", "ACTIVE", "DORMANT", "PENDING", "VALID"]
    },
    cost: {
        type: Number,
        required: true
    },
    meta: {
        dateActivated: {
            type: Date
        },
        discount: {
            type: Number
        },
        dateIssued: {
            type: Date,
            default: Date.now
        },
    },
    addOns: {
        type: [{
            name: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }]
    }
});

const Service = mongoose.model("Service", ServiceSchema);

module.exports = Service;