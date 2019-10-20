const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    web_pages: {
        type: Array,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    domains: {
        type: Array,
        required: true
    },
    flags: {
        type: String,
        required: true
    },
    
    isvisited: {
        type: Boolean,
        required: true,
        default: true
    },
})

const collectionSChema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    schoolChoices: {

        type: [schoolSchema],
        required: true
    },
})
module.exports = mongoose.model('Collection', collectionSChema);
