const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Description = mongoose.model('description');
// checks all the routes on the description routes page
describe('description routes', () => {
    it('checks /seedDescription route on description-router.js', (done) => {
        request(app).get('/api/seedDescription').end(() => {
            Description.find().then(data => {
                assert(data.length === 55)
                done()
            })
        })
    });
    it('checks /getDescription route on description-router.js', (done) => {
        request(app).post('/api/getDescription/color').send([{ name: "Blue" }]).then((data) => {
            assert(data._body[0].quiz === "color")
            assert(data._body[0].name === "Blue")
            done()
        })
    });
});