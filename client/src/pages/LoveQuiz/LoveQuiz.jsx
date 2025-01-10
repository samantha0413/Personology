import React, { Component } from 'react'
import api from '../../Api/quiz-api'
import QuizButton from '../../components/QuizButton'
import { Button, Modal } from 'react-bootstrap'
import DisplayResults from '../../components/DisplayResults';

class LoveQuiz extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loveQuestions: null,
            count: 0,
            userAnswers: [],
            gameOver: false,
            finalResult: [],
            choices: [{
                "Words Of Affirmation": 0,
                "Quality Time": 0,
                "Receiving Gifts": 0,
                "Acts Of Service": 0,
                "Physical Touch": 0
            }],
            show: false
        }
    }
    // functions set and used for the modal that displays how to play the game
    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });
    // this is where the quiz questions are retrieved from the database and set to a variable
    componentDidMount = () => {
        api.getQuestions("love").then(data => {
            this.setState({ loveQuestions: data.data })
        })
    }
    // changes the question to the next question in the quiz and also adds the users answers to the choices variable..also it checks to see if the user has reached the end of the quiz
    changeQuestion = (answ) => {
        let slicedArr = this.state.choices.slice()
        slicedArr[0][answ]++
        this.setState({ choices: slicedArr, count: this.state.count += 1 })
        if (this.state.count === 28) {
            this.setState({ gameOver: true, next: false, loveQuestions: null })
            this.props.getResults("Love", this.state.choices[0])
        }
    }
    render() {
        return (
            <>
                <div className="text-center">
                    <h1 className="allPageTitles">Love Quiz</h1>
                    {!this.gameOver ? <Button type="button" className='allBtn mt-4' onClick={this.handleShow}>Questions?</Button> : ""}
                </div>
                {this.state.loveQuestions ?
                    <div>
                        <div className="text-center mt-5 container"><h4 className="counter">Question {this.state.count + 1} of {this.state.loveQuestions.length}</h4></div>
                        <div className="loveQuesDiv container"><QuizButton
                            question={this.state.loveQuestions[this.state.count].question}
                            answer={this.state.loveQuestions[this.state.count].answers}
                            changeQuestion={this.changeQuestion}
                        /> </div></div>
                    : this.state.gameOver ? <DisplayResults finalResult={this.props.results} type="love" status={this.props.status} />
                        : ""}

                <Modal show={this.state.show} onHide={this.handleClose} className="text-center">
                    <Modal.Header closeButton>
                        <Modal.Title>Instructions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        If you have not yet created an account to be able to login please do that now before taking the quiz. Otherwise you will not be able to see your results.
                </Modal.Body>
                    <Modal.Title>Once you are logged in...</Modal.Title>
                    <Modal.Body>Click on a button to answer each question with the answer the best describes what you prefer/enjoy. Once you have answered all 29 questions, your results will pop up on the screen.</Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default LoveQuiz