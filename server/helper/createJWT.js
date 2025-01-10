const jwt = require('jsonwebtoken');
require('dotenv').config();
// creates the token when a user creates an account or logins to an existing account
async function createJWT(user) {
    const { JWT_SECRET } = process.env;
    const token = await jwt.sign({ id: user._id }, JWT_SECRET, {
       expiresIn: 86400,  //  Expires in 24 hours
      // expiresIn: 15
    });
    return token;
}

module.exports = createJWT;