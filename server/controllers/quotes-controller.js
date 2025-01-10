const Quote = require('../models/quote')
const QuoteSeed = require('../db_seed/quote.json')
// adds all the quotes to the database
const seedQuotes = (req, res) => {
    Quote.find().then(quote => {
        if (quote.length === 0) {
            for (quote of QuoteSeed) {
                Quote.create(quote)
            }
            res.send(quote)
        }
        else {
            res.send(quote)
        }
    }).catch(err => {
        res.status(500).json(err)
    })
}
// adds users quote to database 
const addUserQuotes = (req, res) => {
    Quote.create(req.body).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
}
// gets one quote randomaly for the landing page
const getOneQuote = (req, res) => {
    Quote.find({ approved: true }).then(quotes => {
        let random = Math.floor(Math.random() * quotes.length)
        res.status(200).json(quotes[random])
    }).catch(err => {
        res.status(500).json(err)
    })
}
// gets all the quotes that needs approval
const needsApproval = (req, res) => {
    Quote.find({ approved: false }, { quote: 1, approved: 1 }).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
}
// update approved status
const updateApproved = (req, res) => {
    Quote.findByIdAndUpdate(req.params.id, { approved: true }, { new: true }).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
}
// deletes quote from database
const deleteQuote = (req, res) => {
    Quote.findByIdAndDelete(req.params.id).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        res.status(500).json(err)
    })
}
module.exports = {
    seedQuotes,
    getOneQuote,
    addUserQuotes,
    needsApproval,
    updateApproved,
    deleteQuote
}