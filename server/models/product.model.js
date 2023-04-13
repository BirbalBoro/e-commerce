const mongoose = require('mongoose');

const product_model = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: mongoose.ObjectId,
        ref: 'categories',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    thumbnail: {
        data: Buffer,
        contentType: String,
    },
    shipping: {
        type: Boolean,

    }

}, { timestamps: true });

module.exports = mongoose.model('products', product_model);