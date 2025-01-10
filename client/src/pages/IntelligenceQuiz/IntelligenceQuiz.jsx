import React, { useState, useEffect } from 'react'
import { Button, Modal, Form } from "react-bootstrap"
import api from '../../Api/quiz-api'
import QuizCheckbox from '../../components/QuizCheckbox'
import DisplayResults from '../../components/DisplayResults'

const IntelligenceQuiz = (props) => {
  // variables set and used for the modal that displays how to play the game
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // variables set and used throughout the page
  const [intellQuestions, setIntellQuestions] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [count, setCount] = useState(0)
  const [usersAnswers] = useState(Array(9).fill(null))
  // this is where the quiz questions are retrieved from the database and set to a variable
  useEffect(() => {
    api.getQuestions('intelligence').then(data => {
      setIntellQuestions(data.data)
    })
  }, [])
  // this is where the form is submitted..it then changes to the next question and also gets how many of the boxes was checked and then adds that number to the usersAnswers variable..it also checks to see if the user has reached the end of the quiz
  const submitAnswers = (e) => {
    e.preventDefault()
    let checkboxes = document.getElementsByClassName('form-check-input')
    let total = 0
    for (let boxes in checkboxes) {
      if (checkboxes[boxes].checked) {
        total++
        checkboxes[boxes].checked = false
      }
    }
    usersAnswers[count] = [intellQuestions[count].question[0], total]
    setCount(count + 1)
    if (count === 8) {
      setGameOver(true)
      let finalScores = {}
      for (let score in usersAnswers) {
        finalScores[usersAnswers[score][0]] = usersAnswers[score][1]
      }
      props.getResults('Intelligence', finalScores)
    }
  }
  return (
    <>
      <div className="text-center">
        <h1 className="allPageTitles">Intelligence Quiz</h1>
        {!gameOver ? <Button type="button" className="allBtn mt-4" onClick={handleShow}>Questions?</Button> : ""}
      </div>
      {gameOver ? <DisplayResults type="intelligence" finalResult={props.results} status={props.status} /> : intellQuestions ?
        <div>
          <div className="text-center mt-5 container"><h4 className="counter">Question {count + 1} of {intellQuestions.length}</h4></div>
          <div className="d-flex justify-content-center mt-5 container">
            <Form onSubmit={e => submitAnswers(e)}>
              <QuizCheckbox answers={intellQuestions[count].answers} />
              <div className="text-center mt-5">
                <Button type="submit" className="allBtn mb-4">Next</Button>
              </div>
            </Form>
          </div>
        </div>
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
          Check every statement that is correct about you. When you have selected all that apply hit next. After answering the 9 questions, your intelligence type will be displayed to you.
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

export default IntelligenceQuiz