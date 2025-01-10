const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Quiz = mongoose.model('quiz');
// checks all the routes on the quiz routes page
describe('quiz routes', () => {
    it('checks /seedQuiz route on quiz-router.js', (done) => {
        request(app).get('/api/seedQuiz').end(() => {
            Quiz.find().then(data => {
                assert(data.length === 182)
                done()
            })
        })
    });
    it('checks /questions/:type route on quiz-router.js', (done) => {
        request(app).get('/api/questions/color').then((data) => {
            assert(data._body.length === 7)
            done()
        })
    });
});