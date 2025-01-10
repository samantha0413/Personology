import axios from 'axios'
// creating the base url for each route
const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})
// seeds the quotes into the database
const seedQuotes = () => api.get('/seedQuotes')
// gets one quote for the landing page
const oneQuote = () => api.get('/oneQuote')
// adds the users personal quotes for all to see
const addUserQuote = (quote) => api.post('/addUserQuotes', quote)
// gets quotes that are not approved yet
const needsApproval = () => api.get('/needsApproval')
// updates the approved status of a quote
const updateQuoteStatus = id => api.put(`/updateQuoteStatus/${id}`)
// deletes quote from database
const deleteQuoteForever = (id) => api.delete(`/deleteQuoteForever/${id}`)
// exporting all the functions off the page to be used throughout the app
const shortCuts = {
    seedQuotes,
    oneQuote,
    addUserQuote,
    needsApproval,
    updateQuoteStatus,
    deleteQuoteForever
}

export default shortCuts