const assert = require('assert');
const request = require('supertest');
const app = require('../../server');
const mongoose = require('mongoose');
const Account = mongoose.model('account');
let date = new Date().toISOString()
let person = { fName: "Sam", lName: "Shepherd", email: "sam2@gmail.com", password: "hi", image: "../images/newt.jpeg" }
// checks all the routes on the account routes page
describe('account routes', () => {
    it("checks /getAccount route on account-router.js", (done) => {
        let token
        request(app).post('/api/create').send(person).then(data => {
            token = data._body.token
            request(app).get('/api/getAccount').set('Authorization', 'Bearer ' + token).then((final) => {
                assert(final._body.success === true)
                done()
            })
        })
    })
    it("checks /checkInfo route on account-router.js", (done) => {
        request(app).post('/api/checkInfo').send({ email: "sam2@gmail.com" }).then((data) => {
            assert(data._body.success === true)
            done()
        })
    })
    it("checks /deleteAccount/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).delete(`/api/deleteAccount/${firstData._id}`).send({ password: "hi" }).then((data) => {
                assert(data._body.success === true)
                done()
            })
        })
    })
    it("checks /editAccount/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).put(`/api/editAccount/${firstData._id}`).send({ fName: "ham", lastName: "Shepherd", email: "sam2@gmail.com" }).then((data) => {
                assert(data._body.data.fName === "ham")
                done()
            })
        })
    })
    it("checks /changePassword/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).put(`/api/editAccount/${firstData._id}`).send({ password: "hi", newPassword: "cat" }).then((data) => {
                assert(data._body.success === true)
                done()
            })
        })
    })
    it("checks /updateHistory/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).put(`/api/updatehistory/${firstData._id}`).send([
                {
                    "name": "Love",
                    "history": [
                        {
                            "date": "5-08-2024",
                            "time": 1715187088371,
                            "result": [
                                {
                                    "name": "Words Of Affirmation",
                                    "value": 7
                                },
                                {
                                    "name": "Physical Touch",
                                    "value": 7
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "Attached",
                    "history": [
                        {
                            "date": "5-08-2024",
                            "time": 1715187106121,
                            "result": [
                                {
                                    "name": "Anxious",
                                    "value": 7
                                }
                            ]
                        }
                    ]
                }
            ]).then((data) => {
                assert(data._body.history.length === 2)
                done()
            })
        })
    })
    it("checks /updateAstrology/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).put(`/api/updateAstrology/${firstData._id}`).send({ sign: "Libra" }).then((data) => {
                assert(data._body.data.astrology.sign === "Libra")
                done()
            })
        })
    })
    it("checks /updateNumerology/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).put(`/api/updateNumerology/${firstData._id}`).send([{
                date: Date.now(), result: [
                    {
                        "name": "Life Lesson Number",
                        "number": 3
                    },
                    {
                        "name": "Soul Number",
                        "number": 1
                    },
                    {
                        "name": "Outer Personality Number",
                        "number": 8
                    },
                    {
                        "name": "Path of Destiny Number",
                        "number": 9
                    }
                ]
            }]).then((data) => {
                assert(data._body.data.numerology[0].result.length === 4)
                done()
            })
        })
    })
    it("checks /updateFamilyNumerology/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).put(`/api/updateFamilyNumerology/${firstData._id}`).send({
                info: [{
                    name: "serenity ashby", result: [
                        {
                            "name": "Life Lesson Number",
                            "number": 3
                        },
                        {
                            "name": "Soul Number",
                            "number": 1
                        },
                        {
                            "name": "Outer Personality Number",
                            "number": 8
                        },
                        {
                            "name": "Path of Destiny Number",
                            "number": 9
                        }
                    ]
                },
                {
                    name: "delilah ashby", result: [
                        {
                            "name": "Life Lesson Number",
                            "number": 5
                        },
                        {
                            "name": "Soul Number",
                            "number": 3
                        },
                        {
                            "name": "Outer Personality Number",
                            "number": 9
                        },
                        {
                            "name": "Path of Destiny Number",
                            "number": 1
                        }
                    ]
                }
                ]
            }).then((data) => {
                assert(data._body.data.familyNumerology[0].name === "serenity ashby")
                assert(data._body.data.familyNumerology.length === 2)
                done()
            })
        })
    })
    it("checks /updateFamilyAstrology/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).put(`/api/updateFamilyAstrology/${firstData._id}`).send([{ name: "dominic ashby", sign: 'Cancer' }]).then((data) => {
                assert(data._body.data.familyAstrology[0].name === "dominic ashby")
                assert(data._body.data.familyAstrology[0].sign === "Cancer")
                done()
            })
        })
    })
    it("checks /changePicture/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).put(`/api/changePicture/${firstData._id}`).send({ image: "../images/flower.jpeg" }).then((data) => {
                assert(data._body.image === "../images/flower.jpeg")
                done()
            })
        })
    })
    it("checks /addQuote/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).put(`/api/addQuotes/${firstData._id}`).send(["You are never to old to set a new goal or dream another dream.", "The tragedy of life doesn't lie in not reaching your goal. The tragedy lies in having no goal to reach.", "Our greatest weakness lies in giving up. The most certain way to succeed is always to try just one more time.", "Don't judge each day by the harvest you reap, but by the seeds you plant."]).then((data) => {
                assert(data._body.quotes.length === 4)
                done()
            })
        })
    })
    it("checks /getAdmin route on account-router.js", (done) => {
        request(app).get('/api/getAdmin').then((data) => {
            assert(data.status === 200)
            done()
        })
    })
    it("checks /adminDelete/:id route on account-router.js", (done) => {
        Account.create(person).then(firstData => {
            request(app).delete(`/api/adminDelete/${firstData._id}`).then((data) => {
                assert(data.status === 200)
                done()
            })
        })
    })
    it("checks /getAllAccounts/:type route on account-router.js", (done) => {
        Account.create(person).then(() => {
            request(app).get(`/api/getAllAccounts/all/${date}`).then((data) => {
                assert(data._body.length === 1)
                done()
            })
        })
    })
});