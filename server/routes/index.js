const express = require('express');
const authRouter = require('./auth-router');
const accountRouter = require('./account-router')
const quizRouter = require('./quiz-router');
const descriptionRouter = require('./description-router');
const numerologyRouter = require('./numerology-router')
const astrologyRouter = require('./astrology-router')
const quoteRouter = require('../routes/quote-router')
const router = express.Router();
// using all the routes pages on one page so I can require just one page on my server page
router.use('/', authRouter);
router.use('/', accountRouter)
router.use('/', quizRouter);
router.use('/', descriptionRouter);
router.use('/', numerologyRouter)
router.use('/', astrologyRouter)
router.use('/', quoteRouter)

module.exports = router;