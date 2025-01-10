const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Astrology = mongoose.model('astrology');

describe('astrology routes', () => {
    it('checks /seedAstrology route on astrology-router.js', (done) => {
        request(app).get('/api/seedAstrology').end(() => {
            Astrology.find().then(data => {
                assert(data.length === 12)
                  done()
            })
        })
    });
    it('checks /getAstologyDesc/:sign route on astrology-router.js', (done) => {
        request(app).get(`/api/getAstologyDesc/Libra`).then((data) => {
                assert(data._body[0].date === "September 23 - October 22")
                  done()
        })
    });
});