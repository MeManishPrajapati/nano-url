const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
    nano_url: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('URL', URLSchema);
