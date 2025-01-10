const express = require('express')
const QuizController = require('../controllers/quiz-controller')
const router = express.Router();
// seeds the quiz questions into the databse
router.get('/seedQuiz', QuizController.seedQuizzes)
// gets the questions for one specific quiz the user is taking
router.get('/questions/:type', QuizController.getQuestions)

module.exports = router;