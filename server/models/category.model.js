const mongoose = require('mongoose');

const category_model = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true }
);

module.exports = mongoose.model('categories', category_model);
