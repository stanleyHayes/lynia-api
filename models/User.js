const mongoose = require('mongoose');

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {type: String, required: true},
    role: {type: Schema.Types.ObjectId, ref: "Role", required: true},
    email: {type: String, required: true}, 
    password: {type: String, required: true},
    phone: {type: String, required: true}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;