import axios from 'axios'
// creating the base url for each route
const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})
// seeds the descriptions into the database
const seedDescription = () => api.get('/seedDescription')
// gets the description for the users results as soon as a quiz is complete
const getQuizDescription = (desc, type) => api.post(`/getDescription/${type}`, desc)
// exporting all the functions off the page to be used throughout the app
const shortCuts = {
    seedDescription,
    getQuizDescription
}

export default shortCuts