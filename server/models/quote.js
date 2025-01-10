const mongoose = require('mongoose')
const Schema = mongoose.Schema
// quiz schema for the quizzes collection
const Quotes = new Schema(
    {
        quote: {type:String},
        approved:{type:Boolean, default:false}
    }
)

module.exports = mongoose.model('quote', Quotes)