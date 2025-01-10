import axios from 'axios'
// creating the base url for each route
const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})
// seeds and retrieves the astrology signs
const seedAstrology = () => api.get('/seedAstrology')
// gets one astrology sign for the current users account info page
const getOneAstrology = (sign) => api.get(`/getAstologyDesc/${sign}`)
// exporting all the functions off the page to be used throughout the app
const shortCuts = {
seedAstrology,
getOneAstrology
}

export default shortCuts