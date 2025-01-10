const mongoose = require('mongoose')
const Schema = mongoose.Schema
// description schema for the descriptions collection
const Description = new Schema(
    {
        quiz:String,
        order:Number,
        name: String,
        desc:Array
    }
)

module.exports = mongoose.model('description', Description)