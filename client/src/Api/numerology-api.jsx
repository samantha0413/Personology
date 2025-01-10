import axios from 'axios'
// creating the base url for each route
const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})
// seeds the numerology number descriptions
const seedNumerology = () => api.get('/seedNumerology')
// gets the numerology number descriptions once the user enters the information in the form
const getNumerologyNums = (nums) => api.post('/getNumerologyNums', nums)
// exporting all the functions off the page to be used throughout the app
const shortCuts = {
    seedNumerology,
    getNumerologyNums
}

export default shortCuts