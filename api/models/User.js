const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username: {String, required: true, unique: true, min: 4, max: 32},
    password: {String, required: true, min: 6},
    firstName: {String, required: true},
    lastName: {String, required: true},
    email: {String, required: true, unique: true},
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;