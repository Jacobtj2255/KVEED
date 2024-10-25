const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    college: { type: String, required: true },
    graduationYear: { type: Number, required: true },
    age: { type: Number, required: true }
});

module.exports = mongoose.model('User ', userSchema);