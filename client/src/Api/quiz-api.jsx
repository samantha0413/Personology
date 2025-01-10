import axios from 'axios'
// creating the base url for each route
const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})
// seeds the quiz questions into the database
const seedQuiz = () => api.get('/seedQuiz')
// gets quiz questions for one quiz depending on which quiz the user is trying to take
const getQuestions = (type) => api.get(`/questions/${type}`)
// exporting all the functions off the page to be used throughout the app
const shortCuts = {
    seedQuiz,
    getQuestions
}

export default shortCuts