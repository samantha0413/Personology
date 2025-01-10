// 15
const express = require('express')
const AccountController = require('../controllers/accounts-controller')
const router = express.Router();
const authenticateToken = require('../helper/verifyJWT');
// gets the accounts for whoever is logged in to keep them logged in..also checks if the jsonwebtoken is valid
router.get('/getAccount', authenticateToken, AccountController.getAccount)
// checks to see if an email exists or not when creating an account
router.post("/checkInfo", AccountController.checkInfo)
// deletes the users account
router.delete("/deleteAccount/:id", AccountController.deleteAccount)
// edits the account info (first name, last name, email)
router.put("/editAccount/:id", AccountController.updateAccount)
// changes the password to the current account logged in
router.put("/changePassword/:id", AccountController.changePassword)
// updates the quiz history for the user logged in and adds it to their account
router.put('/updateHistory/:id', AccountController.updateQuizResults)
// updates the users astrology to add it to the account logged in
router.put('/updateAstrology/:id', AccountController.addAstrologyToUser)
// upates the users numerology to add it to the account logged in
router.put('/updateNumerology/:id', AccountController.addNumerologyToUser)
// updates to add family astrology signs to the users account
router.put('/updateFamilyAstrology/:id', AccountController.addFamilyAstrology)
// updates family numerology numbers to the users account
router.put('/updateFamilyNumerology/:id', AccountController.addFamilyNumerology)
// changes the profile for the user logged in
router.put('/changePicture/:id', AccountController.changeProfilePicture)
// add/deletes quotes to users account
router.put('/addQuotes/:id', AccountController.saveQuotes)
// seeding the admin account
router.get("/getAdmin", AccountController.seedAdmin)
// admin delete for the account
router.delete('/adminDelete/:id', AccountController.adminDeleteAccount)
// gets all the accounts depending on what information (all, active, inactive) that the admin is asking for
router.get('/getAllAccounts/:type/:date', AccountController.getAllAccounts)

module.exports = router;