/*
    Model to add, remove or modify Admin Users
*/

const mongoose = require('mongoose');


var adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});


var AdminModel = mongoose.model('admin', adminSchema);


module.exports = {
    AdminModel: AdminModel
};