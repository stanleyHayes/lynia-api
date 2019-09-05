const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  dateCreated: {
    type: Date,
    default: Date.now
  },
  type: {
    type: String,
    required: true
  },
  available: {
    type: Boolean,
    default: false
  },
  serviceAvailability: {
    type: [String]
  },
  servicePackage: {
    type: [String],
    enum: ["Single", "Group"],
    default: "Single"
  },
  description: {
    type: String,
    required: true
  },
  additionalSecurity: {
    type: [String],
    required: true
  },
  usage: {
    type: [String]
  },
  pricing: {
    type: [String],
    required: true
  },
  dormantMode: {
    type: String
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
  },
  cost: {
    currency: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    }
  }
});
//adding rating and feedback to token schema
const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;