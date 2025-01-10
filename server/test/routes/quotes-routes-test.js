const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Quotes = mongoose.model('quote');
let quote = "A quote thats not really a quote for testing purposes"
// checks all the routes on the quiz routes page
describe('quotes routes', () => {
    it('checks /seedQuotes route on quote-router.js', (done) => {
        request(app).get('/api/seedQuotes').then(() => {
            Quotes.find().then(data => {
                assert(data.length > 0 === true)
                done()
            })
        });
    })
    it('checks /oneQuote route on quote-router.js', (done) => {
        Quotes.create({ quote: "adding some random quote", approved: true }).then(() => {
            request(app).get('/api/oneQuote').then((data) => {
                assert(data._body.approved === true)
                done()
            })
        })
    });
    it('checks /addUserQuotes route on quote-router.js', (done) => {
        request(app).post('/api/addUserQuotes').send({ quote: `${quote}` }).then((data) => {
            assert(data._body.approved === false)
            done()
        })
    });
    it('checks /needsApproval route on quote-router.js', (done) => {
        Quotes.create({ quote: `${quote}` }).then(() => {
            request(app).get('/api/needsApproval').then((data) => {
                assert(data._body.length === 1)
                done()
            })
        })
    });
    it('checks /updateQuoteStatus/:id route on quote-router.js', (done) => {
        Quotes.create({ quote: `${quote}` }).then(quote => {
            request(app).put(`/api/updateQuoteStatus/${quote._id}`).then((data) => {
                assert(data._body.approved === true)
                done()
            })
        })
    });
    it('checks /deleteQuoteForever/:id route on quote-router.js', (done) => {
        Quotes.create({ quote: `${quote}` }).then(quote => {
            request(app).delete(`/api/deleteQuoteForever/${quote._id}`).then((data) => {
                assert(data.status === 200)
                done()
            })
        })
    });
});