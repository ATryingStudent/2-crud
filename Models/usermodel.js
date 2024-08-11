const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
}, { collection: 'user' });

module.exports = mongoose.model('user', userSchema);