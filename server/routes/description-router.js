const express = require('express')
const DescriptionController = require('../controllers/description-controller')
const router = express.Router();
// seeds the descriptions into the database
router.get('/seedDescription', DescriptionController.seedDescription)
// gets the users descriptions for the quiz they takee
router.post('/getDescription/:type', DescriptionController.getDescription)

module.exports = router;