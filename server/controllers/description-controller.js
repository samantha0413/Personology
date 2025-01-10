const Description = require('../models/description')
const DescriptionSeed = require('../db_seed/description.json')
// seeds all the descriptions into the database if the user has not been to the website before..if they have it retrieves the descriptions
const seedDescription = (req, res) => {
    Description.find().then(desc => {
        if (desc.length === 0) {
            for (desc of DescriptionSeed) {
                Description.create(desc)
            }
            res.send(desc)
        }
        else {
            res.send(desc)
        }
    })
}
// gets description for the user once the quiz is complete
const getDescription = async (req,res) => {
    try {
        let results = req.body
        let {type} = req.params
        let final = []
        let allResults = await Description.find({quiz:type}).sort({order:1})
        allResults.map(result => {
            results.forEach(oneResult => {
                if (result.name === oneResult.name) {
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
    seedDescription,
    getDescription
}