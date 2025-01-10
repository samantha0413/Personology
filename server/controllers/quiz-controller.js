const Quiz = require('../models/quiz')
const QuizSeed = require('../db_seed/quiz.json')
// seeds the quiz questions into the database
const seedQuizzes = (req, res) => {
    Quiz.find().then(quiz => {
        if (quiz.length === 0) {
            for (qu of QuizSeed) {
                Quiz.create(qu)
            }
            res.send(quiz)
        }
        else {
            res.send(quiz)
        }
    }).catch(err => {
        res.status(500).json(err)
    })
}
// gets the questions for one quiz that the user has selected to take
const getQuestions = (req, res) => {
    const { type } = req.params
    Quiz.find({ name: type }).then(quiz => {
        res.status(200).json(quiz)
    }).catch(err => {
        res.status(500).json(err)
    })
}

module.exports = {
    seedQuizzes,
    getQuestions
}