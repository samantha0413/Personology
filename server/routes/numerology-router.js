const express = require('express')
const NumerologyController = require('../controllers/numerology-controller')
const router = express.Router();
// seeds the numerology descriptions into the database
router.get('/seedNumerology', NumerologyController.seedNumerology)
// gets the users numerology descriptions after the form is filled out
router.post('/getNumerologyNums', NumerologyController.getNumerologyResults)

module.exports = router;