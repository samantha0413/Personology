const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt');
// account schema for the account collection
const Account = new Schema(
    {
        image:{type:String},
        email:{type:String, required:true, unique:true},
        password:{type:String, required:true},
        fName: {type:String, required:true},
        lName:{type:String, required:true},
        history:{type:Array},
        numerology:{type:Array},
        astrology:{type:Object},
        familyNumerology:{type:Array},
        familyAstrology: {type:Array},
        quotes:{type:Array},
        admin:{type:Boolean, default:false},
        lastLogin:{type:Date}
    }
)
// hashes the password before the account is saved
Account.pre('save', async function (next) {
    try {
        let password = this.password;
        this.password = await bcrypt.hash(password, 11);
        next()
    } catch (err) {
        console.log(err)
    }
});
// this is a method that is attached to each account that will compare to make sure the password the user enters matches the hashed password
Account.methods.comparePassword = function (loginPass, callBack) {
        bcrypt.compare(loginPass, this.password, function (err, isMatch) {
            if (err) return callBack(err);
            callBack(null, isMatch);
        });
}

module.exports = mongoose.model('account', Account)