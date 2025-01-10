const mongoose = require('mongoose')
const Schema = mongoose.Schema
// numerology schema for the numerologies collection
const Numerology = new Schema(
    {
        name: String,
        number: Number,
        desc:Array
    }
)

module.exports = mongoose.model('numerology', Numerology)