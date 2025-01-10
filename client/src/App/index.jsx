import React, { Component } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.css"
import NavBar from '../components/NavBar'
import Landing from '../pages/Landing'
import AccountInfo from '../pages/AccountInfo'
import Api from '../Api/auth-api'
import QuizApi from '../Api/quiz-api'
import DescriptionApi from '../Api/description-api'
import NumerologyApi from '../Api/numerology-api'
import AstrologyApi from '../Api/astrology-api'
import AccountApi from '../Api/account-api'
import QuoteApi from '../Api/quote-api'
import ErrorPage from '../pages/ErrorPage'
import Numerology from '../pages/Numerology'
import Astrology from '../pages/Astrology'
import LoveQuiz from '../pages/LoveQuiz'
import ColorQuiz from '../pages/ColorQuiz'
import AttachedQuiz from '../pages/AttachedQuiz'
import FruitQuiz from '../pages/FruitQuiz'
import AnimalQuiz from '../pages/AnimalQuiz'
import AboutPersonality from '../pages/AboutPersonality'
import AboutNumerology from '../pages/AboutNumerology'
import AboutAstrology from '../pages/AboutAstrology'
import MyersBriggs from '../pages/MyersBriggs'
import IntelligenceQuiz from '../pages/IntelligenceQuiz'
import Admin from '../pages/Admin'
import moment from 'moment'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: false,
            user: null,
            finalResult: null,
            history: [],
            img: null,
            type: null,
            quotes: [],
            admin: false
        }
    }
    // checks to see if there is a user logged in or not and if one is logged in..keeps them logged in
    checkLoggedIn = async () => {
        const token = localStorage.getItem('token')
        if (token) {
            await Api.getAccount().then(res => {
                if (res) {
                    if (res.data.user.admin) {
                        this.setState({ admin: true })
                    }
                    this.setState({ user: res.data.user, status: true, history: res.data.user.history, quotes: res.data.user.quotes })
                }
            })
        }
    }
    // this is where the information for the quizzes, descriptions, astrology, and numerology is being seeded
    componentDidMount = () => {
        this.checkLoggedIn()
        QuizApi.seedQuiz()
        DescriptionApi.seedDescription()
        NumerologyApi.seedNumerology()
        AstrologyApi.seedAstrology()
        QuoteApi.seedQuotes()
        AccountApi.seedAdmin()
    }
    // change the status of the user logged in or not
    changeStatus = (status, user) => {
        if (status) {
            if (user.data.admin) {
                this.setState({ admin: true })
            }
            this.setState({ user: user.data, history: user.data.history, quotes: user.data.quotes })
            setTimeout(() => {
                if (this.state.type && this.state.finalResult) {
                    this.addHistory(this.state.type, this.state.finalResult)
                }
            }, 10)
        } else {
            this.setState({ user: null, admin: false })
            localStorage.removeItem('token')
        }
        this.setState({ status: status })
    }
    // gets the descriptions for the quiz the user takes
    getResults = (type, obj) => {
        let sorted = []
        let final = []
        for (let prop in obj) {
            let newObj = {
                name: prop,
                value: obj[prop]
            }
            sorted.push(newObj)
        }
        sorted.sort((a, b) => b.value - a.value)
        final.push(sorted[0])
        for (let x = 1; x < sorted.length; x++) {
            if (final[0].value === sorted[x].value) {
                final.push(sorted[x])
            }
        }
        this.setState({ finalResult: final, type: type })
        if (this.state.user) {
            this.addHistory(type, final)
        }
    }
    // add quiz results to the users history in their account for all quizzes
    addHistory = (type, obj) => {
        let history = this.state.history.slice()
        let updated = false
        history.map((hist) => {
            if (hist.name === type) {
                hist.history.push({ date: moment().format("M-DD-YYYY"), time: Date.now(), result: obj })
                updated = true
            }
        })
        if (updated) {
            history = history
        } else {
            history.push({ name: type, history: [{ date: moment().format("M-DD-YYYY"), time: Date.now(), result: obj }] })
        }
        this.setState({ history: history })
        AccountApi.changeHistory(this.state.user._id, history)
    }
    // sets and changes profile picture from accountInfo page and LogIn component
    convert = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                console.log(resolve(fileReader.result))
            }
            fileReader.onerror = (error) => {
                reject(error)
            }
        })
    }
    // part of the function that converts and sets profile images to binary
    convertPicture = async (image) => {
        const file = image
        const base64 = await this.convert(file)
        this.setState({ img: base64 })
    }
    render() {
        return (
            <>
                <Router>
                    <NavBar
                        status={this.state.status}
                        changeStatus={this.changeStatus}
                        user={this.state.user}
                        convertPicture={this.convertPicture}
                        image={this.state.img}
                        admin={this.state.admin}
                    />
                    <Routes>
                        <Route path="/" element={<Landing user={this.state.user} quotes={this.state.quotes} checkLoggedIn={this.checkLoggedIn} />} />
                        <Route path="/accountInfo" element={<AccountInfo user={this.state.user} convertPicture={this.convertPicture} image={this.state.img} changeStatus={this.changeStatus} />} changeStatus={this.changeStatus} />
                        <Route path="/love" element={<LoveQuiz getResults={this.getResults} results={this.state.finalResult} status={this.state.status} />} />
                        <Route path="/color" element={<ColorQuiz getResults={this.getResults} results={this.state.finalResult} status={this.state.status} />} />
                        <Route path="/attached" element={<AttachedQuiz getResults={this.getResults} results={this.state.finalResult} status={this.state.status} />} />
                        <Route path="/animal" element={<AnimalQuiz getResults={this.getResults} results={this.state.finalResult} status={this.state.status} />} />
                        <Route path="/fruit" element={<FruitQuiz getResults={this.getResults} results={this.state.finalResult} status={this.state.status} />} />
                        <Route path="/Myers-Briggs" element={<MyersBriggs getResults={this.getResults} results={this.state.finalResult} status={this.state.status} />} />
                        <Route path="/intelligence" element={<IntelligenceQuiz getResults={this.getResults} results={this.state.finalResult} status={this.state.status} />} />
                        <Route path="/numerology" element={<Numerology status={this.state.status} user={this.state.user} />} />
                        <Route path="/astrology" element={<Astrology user={this.state.user} status={this.state.status} />} />
                        <Route path="/aboutNumerology" element={<AboutNumerology />} />
                        <Route path="/aboutAstrology" element={<AboutAstrology />} />
                        <Route path="/aboutPersonality" element={<AboutPersonality />} />
                        {this.state.admin ? <Route path="/admin" element={<Admin />} /> : ""}
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Router>
            </>
        )
    }
}

export default App