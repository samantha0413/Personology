import axios from 'axios'
// creating the base url for each route
const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})
// checking to see if the user exists
const checkIfEmailValid = (info) => api.post('/checkInfo', info)
// deletes the users account
const deleteAccount = (id, password) => api.delete(`/deleteAccount/${id}`, { data: { password: password } })
// edits the users account (first name, last name, email)
const editAccount = (id, info) => api.put(`/editAccount/${id}`, info)
// changes the users current password to a new password
const changePassword = (id, info) => api.put(`/changePassword/${id}`, info)
// updates the quiz history for the user currently logged in
const changeHistory = (id, info) => api.put(`/updateHistory/${id}`, info)
// updates the astrology sign for the user currently logged in
const addAstrology = (id, sign) => api.put(`/updateAstrology/${id}`, sign)
// updates the numemrology numbers for the user currently logged in
const addNumerology = (id, numbers) =>  api.put(`/updateNumerology/${id}`, numbers)
// changes the profile picture for the current user
const changePicture = (id, pic) => api.put(`/changePicture/${id}`, pic)
// updates the family numerology numbers for the user currently logged in
const updateFamilyNumerology = (id, info) => api.put(`/updateFamilyNumerology/${id}`, info)
// updates the family astrology signs for the user currently logged in
const updateFamilyAstrology = (id, info) => api.put(`/updateFamilyAstrology/${id}`, info)
// saves/deletes quotes to/from users account
const saveQuotes = (id, info) => api.put(`/addQuotes/${id}`, info)
// seeding admin account
const seedAdmin = () => api.get('/getAdmin')
// admin delete for accounts
const adminDelete = (id) => api.delete(`/adminDelete/${id}`)
// gets all the accounts/active accounts/inactive accounts
const getAllAccounts = (type, date) => api.get(`/getAllAccounts/${type}/${date}`)
// exporting all the functions off the page to be used throughout the app
const shortCuts = {
    checkIfEmailValid,
    deleteAccount,
    editAccount,
    changePassword,
    changeHistory,
    addAstrology,
    addNumerology,
    changePicture,
    updateFamilyNumerology,
    updateFamilyAstrology,
    saveQuotes,
    seedAdmin,
    adminDelete,
    getAllAccounts
}

export default shortCuts