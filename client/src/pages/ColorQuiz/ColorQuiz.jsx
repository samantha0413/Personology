import React, { useEffect, useState } from 'react'
import QuizInputForm from '../../components/QuizInputForm'
import api from '../../Api/quiz-api'
import DisplayResults from "../../components/DisplayResults"
import { Button, Modal } from 'react-bootstrap'

const ColorQuiz = (props) => {
    // variables set and used for the modal that displays how to play the game
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // variables set and used throughout the page
    const [colorQuestions, setColorQuestions] = useState(null)
    const [count, setCount] = useState(0)
    const [colors] = useState({ Red: 0, Orange: 0, Yellow: 0, Green: 0, Blue: 0, Purple: 0 })
    const [gameOver, setGameOver] = useState(false)
    // this is where the quiz questions are retrieved from the database and set to a variable
    useEffect(() => {
        api.getQuestions("color").then(ques => {
            setColorQuestions(ques.data)
        })
    }, [])
    // changes the question to the next question in the quiz and also adds the users answers to the colors variable..also it checks to see if the user has reached the end of the quiz
    const changeQuestion = (ans) => {
        colors.Red += Number(ans[0])
        colors.Orange += Number(ans[1])
        colors.Yellow += Number(ans[2])
        colors.Green += Number(ans[3])
        colors.Blue += Number(ans[4])
        colors.Purple += Number(ans[5])
        if (count === 6) {
            setGameOver(true)
            props.getResults('Color', colors)
        }
        setCount(count + 1)
    }
    return (
        <>
            <div className="text-center">
                <h1 className="text-center mt-3  allPageTitles mb-4">Color Quiz</h1>
                {!gameOver ? <Button type="button" className="allBtn" onClick={handleShow}>Questions?</Button> : ""}
            </div>
            {(colorQuestions) && (!gameOver) ?
                <div>
                    <div className="text-center mt-5 container"><h4 className="counter">Question {count + 1} of {colorQuestions.length}</h4></div>
                    <div className="container mt-5 text-center colorQuesDiv">
                        <QuizInputForm
                            type="color"
                            changeQuestion={changeQuestion}
                            question={colorQuestions[count].question}
                            answer={colorQuestions[count].answers}
                        />
                    </div>
                </div>
                : gameOver ? <DisplayResults finalResult={props.results} type="color" status={props.status} />
                    : <h4 className="text-center mb-5 mt-5">Click next for next question</h4>}

            <Modal show={show} onHide={handleClose} className="text-center">
                <Modal.Header closeButton>
                    <Modal.Title>Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    If you have not yet created an account to be able to login please do that now before taking the quiz. Otherwise you will not be able to see your results.
                </Modal.Body>
                <Modal.Title>Once you are logged in...</Modal.Title>
                <Modal.Body>
                    Read through the words and choose the set of words that sounds the most like you. Put a 6 in that box. Then read through the rest of the words and choose the next set of words that sounds the most like you. Put a 5 in that box. Repeat this process until all the boxes have a number 1-6 placed in the boxes. The numbers 1-6 can only be used one time. Remember 6 is most like you and 1 is the least like you.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ColorQuiz