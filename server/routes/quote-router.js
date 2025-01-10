const express = require('express')
const QuoteController = require('../controllers/quotes-controller')
const router = express.Router();
// seeds the quotes into the databse
router.get('/seedQuotes', QuoteController.seedQuotes)
// get one qoute to display on account page
router.get('/oneQuote', QuoteController.getOneQuote)
// adds users quote to the database for other users to see
router.post('/addUserQuotes', QuoteController.addUserQuotes)
// gets all the qoutes that need approval
router.get('/needsApproval', QuoteController.needsApproval)
// updates the approved status of a quote
router.put('/updateQuoteStatus/:id', QuoteController.updateApproved)
// deletes quote from database
router.delete('/deleteQuoteForever/:id', QuoteController.deleteQuote)
module.exports = router;