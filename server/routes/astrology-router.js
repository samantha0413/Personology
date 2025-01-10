const express = require('express')
const AstrologyController = require('../controllers/astrology-controller')
const router = express.Router();
// seeds the astrology signs into the database
router.get('/seedAstrology', AstrologyController.seedAstrology)
// gets one astrology sign to display on the users account info page (which ever sign is saved to their profile)
router.get('/getAstologyDesc/:sign', AstrologyController.getOneAstrology)

module.exports = router;