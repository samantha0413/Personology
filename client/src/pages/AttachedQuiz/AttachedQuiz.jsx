import React, { useEffect, useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import QuizQuestion from '../../components/QuizQuestion'
import QuizButton from '../../components/QuizButton'
import DisplayResults from '../../components/DisplayResults'
import api from "../../Api/quiz-api"

const AttachedQuiz = (props) => {
    // variables set for the modal used to display how to take the quiz
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // variables set and used throughout the page
    const [attachedQues, setAttachedQues] = useState(null)
    const [count, setCount] = useState(0)
    const [but] = useState(["True", "False"])
    const [gameOver, setGameOver] = useState(false)
    const [choices, setChoices] = useState({ Anxious: 0, Avoidant: 0, Secure: 0 })
    // this is where the quiz questions are retrieved from the database and set
    useEffect(() => {
        api.getQuestions("attached").then(data => {
            setAttachedQues(data.data)
        })
    }, [])
    // this changes the questions and adds the users answers to the choices variable..also it checks to see if the user has reached the end of the quiz
    const changeQuestion = (ans) => {
        if (ans !== '') {
            choices[ans]++
            setChoices(choices)
        }
        if (count === 41) {
            setGameOver(true)
            setAttachedQues(null)
            props.getResults('Attached', choices)
        }
        setCount(count + 1)
    }
    return (
        <>
            <div className="text-center">
                <h1 className="allPageTitles">Attached Quiz</h1>
                {!gameOver ? <Button type="button" className='allBtn' onClick={handleShow}>Questions?</Button> : ""}
            </div>
            {attachedQues ?
                <div>
                    <div className="text-center mt-5 container"><h4 className="counter">Question {count + 1} of {attachedQues.length}</h4></div>
                    <div className="attachedQuesDiv container"><QuizQuestion ques={attachedQues[count].question} /><div className="attachedBtnDiv"><QuizButton
                        question={but}
                        answer={attachedQues[count].answers}
                        changeQuestion={changeQuestion}
                    /></div></div></div>
                : gameOver ? <DisplayResults finalResult={props.results} type="attached" status={props.status} />
                    : ""}

            <Modal show={show} onHide={handleClose} className="text-center">
                <Modal.Header closeButton>
                    <Modal.Title>Instructions</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    If you have not yet created an account to be able to login please do that now before taking the quiz. Otherwise you will not be able to see your results.
                </Modal.Body>
                <Modal.Title>Once you are logged in...</Modal.Title>
                <Modal.Body>
                    Click on the "True" button if the statement is true about you or click on "False" if the statement is not true about you. Once you have answered all 42 questions your attachment style results will be displayed.
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

export default AttachedQuiz