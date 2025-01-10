const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Account = mongoose.model('account');
// checks all the routes on the auth router page
describe('account routes', () => {
    it('checks /create route on auth-router.js', (done) => {
        request(app).post('/api/create').send({ fName: "Sam", lName: "Shepherd", email: "sam2@gmail.com", password: "hi" }).end(() => {
            Account.findOne({ email: "sam2@gmail.com" }).then((data) => {
                assert(data.fName === "Sam")
                done()
            })
        })
    });
    it("checks /verify route on auth-router.js", (done) => {
        Account.create({ fName: "Sam", lName: "Shepherd", email: "sam2@gmail.com", password: "hi" }).then(() => {
            request(app).post('/api/verify').send({ name: "sam2@gmail.com", password: "hi" }).then((data) => {
                assert(data._body.success === true)
                done()
            })
        })
    })
})