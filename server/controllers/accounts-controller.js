let Account = require('../models/account')
let AdminSeed = require('../db_seed/account.json')
let createJWT = require('../helper/createJWT')
let bcrypt = require('bcrypt')
// seeds admin account
const seedAdmin = (req, res) => {
    Account.find().then(account => {
        if (account.length === 0) {
            for (account of AdminSeed) {
                Account.create(account)
            }
            res.send(account)
        }
        else {
            res.send(account)
        }
    })
}
// creates the users account
createAccount = async (req, res) => {
    try {
        const createAccount = await Account.create(req.body)
        const token = await createJWT(createAccount)
        return res.send({
            data: createAccount,
            success: true,
            token: token,
            message: "Account Created..Please log in to access your account."
        })
    } catch (err) {
        res.send({
            success: false,
            message: "Something went wrong"
        })
    }
}
// verifys the accounts exists when the user is trying to login
const verifyAccount = async (req, res) => {
    try {
        let name = req.body.name
        let password = req.body.password
        let user = await Account.findOne({ email: name })
        user.comparePassword(password, async (err, isMatch) => {
            if (!isMatch) {
                res.send({ success: false, msg: 'Invalid Credentials' })
                return
            }
            const token = await createJWT(user)
            let date = new Date().toISOString()
            Account.findByIdAndUpdate(user._id, { $set: { lastLogin: date } }, { new: true }).then(data => {
                data.password = null
                res.send({ success: true, data: data, token: token })
            })
        })
    } catch (err) {
        res.send({
            success: false,
            msg: "Invalid Credentials."
        })
    }
}
// gets the account after it checks to see if token is valid
const getAccount = async (req, res) => {
    try {
        const user = await Account.findOne({ _id: req.user })
        user.password = null
        res.send({ success: true, user: user })
    } catch (err) {
        res.status(500).json({ success: false, message: "Something went wrong." })
    }
}
// checks to see if the email already exists (live update, before they hit enter) when the user is creating an account
const checkInfo = (req, res) => {
    const { email } = req.body
    Account.find({ email: email }).then(data => {
        if (data.length !== 0) {
            res.json({ success: false, message: "Email already exists" })
        } else {
            res.json({ success: true, message: "Email is valid" })
        }
    })
}
// deletes the users account
const deleteAccount = async (req, res) => {
    Account.findById({ _id: req.params.id }).then(account => {
        account.comparePassword(req.body.password, async (err, isMatched) => {
            if (err) {
                res.send({
                    success: false,
                    msg: 'Something went wrong.',
                    error: err
                })
            }
            if (isMatched) {
                Account.findByIdAndDelete({ _id: req.params.id }).then(deletedAccount => {
                    res.send({
                        success: true,
                        msg: "Account Deleted"
                    })
                })
            } else {
                res.send({
                    success: false,
                    msg: "Account was not deleted..Check your password and try again."
                })
            }
        })
    })

}
// updates the users account information (first name, last name, email)
const updateAccount = (req, res) => {
    Account.findByIdAndUpdate(req.params.id, { email: req.body.email, fName: req.body.fName, lName: req.body.lName }, { new: true }).then(account => {
        res.status(200).json({ success: true, data: account })
    }).catch(err => {
        res.json({ success: false, msg: "Email already Exists..Please choose another one" })
    })
}
// changes the users password to a new one
const changePassword = (req, res) => {
    Account.findById({ _id: req.params.id }).then(account => {
        account.comparePassword(req.body.password, async (err, isMatched) => {
            if (err) {
                res.send({
                    error: err,
                    success: false,
                    msg: 'something went wrong'
                })
            }
            if (isMatched) {
                let hashed = await bcrypt.hash(req.body.newPassword, 10);
                Account.findByIdAndUpdate({ _id: req.params.id }, { password: hashed }).then(result => {
                    res.send({
                        success: true,
                        msg: "Password Changed"
                    })
                }
                )
            } else {
                res.send({
                    success: false,
                    msg: "Your Current Password Is Incorrect"
                })
            }
        })
    })
}
// updates the users account to add the quiz history
const updateQuizResults = (req, res) => {
    let { id } = req.params
    let { body } = req
    Account.findByIdAndUpdate(id, { $set: { history: body } }, { new: true }).then(account => {
        res.status(200).json(account)
    })
}
// updates the users account to add their astrology sign
const addAstrologyToUser = (req, res) => {
    Account.findByIdAndUpdate(req.params.id, { $set: { astrology: req.body } }, { new: true }).then(account => {
        res.json({ success: true, data: account })
    })
}
// updates the users account to add their numerology numbers
const addNumerologyToUser = (req, res) => {
    Account.findByIdAndUpdate(req.params.id, { $set: { numerology: req.body } }, { new: true }).then(account => {
        res.json({ success: true, data: account })
    }).catch(err => {
        res.json({ success: false, msg: "Something went wrong. Please Try again." })
    })
}
// changes the users profile picture
const changeProfilePicture = (req, res) => {
    Account.findByIdAndUpdate(req.params.id, { $set: { image: req.body.image } }, { new: true }).then(account => res.status(200).json(account))
}
// updates the account with the users family members' numerology numbers
const addFamilyNumerology = (req, res) => {
    Account.findByIdAndUpdate(req.params.id, { $set: { familyNumerology: req.body.info } }, { new: true }).then(data => res.json({ success: true, data: data })).catch(err => {
        res.json({ success: false, msg: "Something went wrong. Please Try again." })
    })
}
// updates the account with the users family memebers' astrology signs
const addFamilyAstrology = (req, res) => {
    Account.findByIdAndUpdate(req.params.id, { $set: { familyAstrology: req.body } }, { new: true }).then(data => res.json({ success: true, data: data })).catch(err => {
        res.json({ success: false, msg: "Something went wrong. Please Try again." })
    })
}
// saves quotes to users account
const saveQuotes = (req, res) => {
    Account.findByIdAndUpdate(req.params.id, { $set: { quotes: req.body } }, { new: true }).then(data => {
        res.send(data)
    })
}
// admin delete for users account
const adminDeleteAccount = (req, res) => {
    Account.findByIdAndDelete(req.params.id, { new: true }).then(data => {
        res.status(200).json(data)
    })
}
// gets all the accounts depending on what information (all, active, inactive) that the admin is asking for
const getAllAccounts = (req, res) => {
    let { type } = req.params
    let { date } = req.params
    if (type === 'all') {
        Account.find().then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    } else if (type === 'inactive') {
        Account.find({ lastLogin: { $lte: date } }).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    } else if (type === 'active') {
        Account.find({ lastLogin: { $gte: date } }).then(data => {
            res.status(200).json(data)
        }).catch(err => {
            res.status(500).json(err)
        })
    }
}
module.exports = {
    createAccount,
    verifyAccount,
    getAccount,
    checkInfo,
    deleteAccount,
    updateAccount,
    changePassword,
    updateQuizResults,
    addAstrologyToUser,
    addNumerologyToUser,
    changeProfilePicture,
    addFamilyNumerology,
    addFamilyAstrology,
    saveQuotes,
    seedAdmin,
    adminDeleteAccount,
    getAllAccounts
}