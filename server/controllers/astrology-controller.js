const Astrology = require('../models/astrology')
const AstrologySeed = require('../db_seed/astrology.json')
// seeds all the astrology signs into the database if the user has not been to the website before..if they have it retrieves the astrology signs
const seedAstrology = (req, res) => {
    Astrology.find().sort({ order: 1 }).then(desc => {
        if (desc.length === 0) {
            for (desc of AstrologySeed) {
                Astrology.create(desc)
            }
            res.send(desc)
        }
        else {
            res.send(desc)
        }
    })
}
// gets one astrology sign to display on the users account info page
const getOneAstrology = (req, res) => {
    Astrology.find({ sign: req.params.sign }).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json({ msg: "something went wrong." })
    })
}

module.exports = {
    seedAstrology,
    getOneAstrology
}