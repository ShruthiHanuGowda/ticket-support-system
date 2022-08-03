
const mongoose = require('mongoose');

const profileSchema = mongoose.Schema({
    website: {
        type: String,
        required: true,
        default: ""
    },
    phone: {
        type: Number,
        required: true,
        default: 0
    },
    profile_img: {
        type: String,
        required: true,
        default: ""
    },
    address: {
        type: String,
        required: true,
        default: ""
    }
});

module.exports.profileSchema = mongoose.model('profile', profileSchema, 'profile');