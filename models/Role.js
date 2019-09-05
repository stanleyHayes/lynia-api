const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ActionSchema = new Schema({
    action: {type: String, enum: ['block', 'create', 'delete', 'update', 'read', 'sell', 'buy', 'manage']},
    victims: {type: [String]}
});


const RoleSchema = new Schema({
    name: {type: String, required: true},
    permissions: {
        type: [ActionSchema],
        required: true
    },
    type: {type: String, required: true}
});


const Role = mongoose.model("Role", RoleSchema);

module.exports = Role;