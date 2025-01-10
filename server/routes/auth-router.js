const express = require('express')
const AccountController = require('../controllers/accounts-controller')
const router = express.Router();
// creates the users account
router.post('/create', AccountController.createAccount);
// allows the user to login (verifys there is an existing account)
router.post('/verify', AccountController.verifyAccount);

module.exports = router;