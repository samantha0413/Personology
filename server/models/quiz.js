const mongoose = require('mongoose')
const Schema = mongoose.Schema
// quiz schema for the quizzes collection
const Quiz = new Schema(
    {
        name: String,
        question: Array,
        answers:Array
    }
)

module.exports = mongoose.model('quiz', Quiz)