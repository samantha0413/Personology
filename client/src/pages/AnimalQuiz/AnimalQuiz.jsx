import React, { useEffect, useState } from 'react'
import api from '../../Api/quiz-api'
import QuizInputForm from '../../components/QuizInputForm'
import DisplayResults from '../../components/DisplayResults'
import { Button, Modal } from 'react-bootstrap'

const AnimalQuiz = (props) => {
    // the variables that hide and show the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // all the variables that are set and used for this quiz
    const [animalQuestions, setAnimalQuestions] = useState(null)
    const [count, setCount] = useState(0)
    const [gameOver, setGameOver] = useState(false)
    const [animals] = useState({ Lion: 0, Otter: 0, "Golden Retriever": 0, Beaver: 0, })
    // this gets and sets the questions as soon as the page loads
    useEffect(() => {
        api.getQuestions("animal").then(ques => {
            setAnimalQuestions(ques.data)
        })
    }, [])
    // this changes the question to the next one once form is submitted..also it adds the current questions answers to the animals object..also it checks to see if the user has reached the end of the quiz
    const changeQuestion = (ans) => {
        if (count === 9) {
            setGameOver(true)
            props.getResults('Animal', animals)
        }
        animals.Lion += Number(ans[0])
        animals.Otter += Number(ans[1])
        animals["Golden Retriever"] += Number(ans[2])
        animals.Beaver += Number(ans[3])
        setCount(count + 1)
    }
    return (
        <>
            <div className="text-center">
                <h1 className="allPageTitles mb-4">Animal Quiz</h1>
                {!gameOver ? <Button type="button" className='allBtn' onClick={handleShow}>Questions?</Button> : ""}
            </div>
            {(animalQuestions) && (!gameOver) ?
                <div className="text-center">
                    <div className="text-center mt-5 container mb-5"><h4 className="counter">Question {count + 1} of {animalQuestions.length}</h4></div>
                    <QuizInputForm
                        changeQuestion={changeQuestion}
                        question={animalQuestions[count].question}
                        answer={animalQuestions[count].answers}
                    />
                </div>
                : gameOver ? <DisplayResults type="animal" finalResult={props.results} status={props.status} />
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

export default AnimalQuiz