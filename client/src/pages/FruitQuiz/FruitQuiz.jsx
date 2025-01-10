import React, { useEffect, useState } from 'react'
import api from '../../Api/quiz-api'
import QuizInputForm from '../../components/QuizInputForm'
import DisplayResults from '../../components/DisplayResults'
import { Button, Modal } from 'react-bootstrap'

const FruitQuiz = (props) => {
    // variables set and used for the modal that displays how to play the game
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // variables set and used throughout the page
    const [fruitQuestions, setFruitQuestions] = useState(null)
    const [count, setCount] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [fruits] = useState({ Grape: 0, Orange: 0, Banana: 0, Melon: 0, })
    // this is where the quiz questions are retrieved from the database and set to a variable
    useEffect(() => {
        api.getQuestions("fruit").then(ques => {
            setFruitQuestions(ques.data)
        })
    }, [])
    // changes the question to the next question in the quiz and also adds the users answers to the fruits variable..also it checks to see if the user has reached the end of the quiz
    const changeQuestion = (ans) => {
        fruits.Grape += Number(ans[0])
        fruits.Orange += Number(ans[1])
        fruits.Banana += Number(ans[2])
        fruits.Melon += Number(ans[3])
        if (count === 13) {
            setGameOver(true)
            props.getResults('Fruit', fruits)
        }
        setCount(count + 1)
    }
    return (
        <>
            <div className="text-center">
                <h1 className="text-center allPageTitles mb-4">Fruit Quiz</h1>
                {!gameOver ? <Button type="button" className="allBtn" onClick={handleShow}>Questions?</Button> : ""}
            </div>
            {(fruitQuestions) && (!gameOver) ?
                <div className="text-center mt-5">
                    <div className="text-center mt-5 container mb-5"><h4 className="counter">Question {count + 1} of {fruitQuestions.length}</h4></div>
                    <QuizInputForm
                        changeQuestion={changeQuestion}
                        question={fruitQuestions[count].question}
                        answer={fruitQuestions[count].answers}
                    />
                </div>
                : gameOver ? <DisplayResults type="fruit" finalResult={props.results} status={props.status} />
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
                    Read through the words and choose the the word that sounds the most like you. Put a 4 in that box. Then read through the rest of the words and choose the next word that sounds the most like you. Put a 3 in that box. Repeat this process until all the boxes have a number 1-4 placed in the boxes. The numbers 1-4 can only be used one time. Remember 4 is most like you and 1 is the least like you.
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

export default FruitQuiz