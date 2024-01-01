const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, min: 4, max: 32 },
    password: { type: String, required: true, min: 6 },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, 
    profilePicture: { type: String, default: 'uploads/default.png' },
});

const UserModel = model('User', UserSchema);

module.exports = UserModel;