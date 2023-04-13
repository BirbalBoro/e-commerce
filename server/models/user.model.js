const mongoose = require("mongoose");

//creating a user schema
const user_model = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    role: {
        type: Boolean,
        default: false
    }
    
},{timestamps: true}
);

module.exports = mongoose.model('users', user_model);