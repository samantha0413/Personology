const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Numerology = mongoose.model('numerology');
// checks all the routes on the numerology routes page
describe('numerology routes', () => {
  it('checks /seednumerology route on numerology-router.js', (done) => {
    request(app).get('/api/seedNumerology').end(() => {
      Numerology.find().then(data => {
        assert(data.length === 52)
        done()
      })
    })
  });
  it('checks /getNumerolgoyNums route on quiz-router.js', (done) => {
    request(app).post('/api/getNumerologyNums').send([
      {
        name: "Life Lesson Number",
        number: 3
      },
      {
        name: "Soul Number",
        number: 1
      },
      {
        name: "Outer Personality Number",
        number: 8
      },
      {
        name: "Path of Destiny Number",
        number: 9
      }
    ]).then((data) => {
      assert(data._body.length === 4)
      done()
    })
  });
});