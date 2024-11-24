const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    googleId: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    displayName: { type: String, required: false },  // Make displayName optional
});

const User = mongoose.model('User', userSchema);

module.exports = User;
