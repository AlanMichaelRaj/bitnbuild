const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['Admin', 'Manager', 'Patron'], default: 'Patron' }
});

module.exports = mongoose.model('User', userSchema);
