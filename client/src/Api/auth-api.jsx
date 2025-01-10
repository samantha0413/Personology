import axios from 'axios'
// creating the base url for each route
const api = axios.create({
    baseURL: 'http://localhost:4000/api'
})
// creates the account
const createAccount = async payload => {
    const res = await api.post('/create', payload);
    return res;
}
// checks to see if the account exists and if the password matches when the use logins
const verifyAccount = async payload => {
    const res = await api.post('/verify', payload);
    return res;
}
// gets the account and authenticates the token to make sure the token hasnt expired
const getAccount = async () => {
    const token = window.localStorage.getItem('token');
    const res = await api.get('/getAccount', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch(err => {
        if (err) {
            localStorage.removeItem('token')
            alert('session has timed out..please log back in to continue.')
            window.location.href = '/'
        }
    });
    return res;
}
// exporting all the functions off the page to be used throughout the app
const shortCuts = {
    createAccount,
    verifyAccount,
    getAccount
}

export default shortCuts