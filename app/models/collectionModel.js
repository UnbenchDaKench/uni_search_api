const mongoose = require('mongoose');

const schoolSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    flag: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    }
})

const collectionSChema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    schoolChoices: {

        type: [schoolSchema],
    },
    mainId: mongoose.Schema.Types.ObjectId
})
module.exports = mongoose.model('Collection', collectionSChema);
