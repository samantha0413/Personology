const Numerology = require('../models/numerology')
const NumerologySeed = require('../db_seed/numerology.json')
// seeds the numerology number descriptions into the database
const seedNumerology = (req, res) => {
    Numerology.find().then(desc => {
        if (desc.length === 0) {
            for (desc of NumerologySeed) {
                Numerology.create(desc)
            }
            res.send(desc)
        }
        else {
            res.send(desc)
        }
    })
}
// gets the users numerology descriptions for their results
const getNumerologyResults = async (req, res) => {
    try {
        let results = req.body
        let final = []
        let allResults = await Numerology.find({})
        allResults.map(result => {
            results.forEach(oneResult => {
                if (result.name === oneResult.name && result.number === oneResult.number) {
                    final.push(result)
                }
            })
        })
        await res.status(200).json(final)
    } catch (err) {
        res.send({ message: "something went wrong", success: false, error: err })
    }
}

module.exports = {
    seedNumerology,
    getNumerologyResults
}