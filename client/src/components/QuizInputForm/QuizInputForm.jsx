import React, { useState, useEffect } from 'react'
import { Form, Button, Toast} from 'react-bootstrap'

const QuizInputForm = (props) => {
  // variables set on this page
  const [inputNums, setInputNums] = useState([])
  const [duplicate] = useState([])
  const [msg, setMsg] = useState('')
  const [max, setMax] = useState(null)
  const [showToast, setToastShow] = useState(false);
  // this runs as soon as the page loads and it sets the max attribute on each input for each quiz so that you can't just enter any number
  useEffect(() => {
    if (!max) {
      if (props.type === "color") {
        setMax(6)
      } else {
        setMax(4)
      }
    }
  })
  // this checks to make sure that the numbers (1-4 or 1-6) that are entered into the inputs are only used once..if you use a single number twice it will display a message to the user asking for the to use either 1-4 or 1-6 only once
  const checkNumber = (e) => {
    e.preventDefault()
    const allInputs = document.getElementsByClassName("gameInputs")
    for (let i = 0; i < allInputs.length; i++) {
      inputNums.push(allInputs[i].value)
    }
    inputNums.forEach(num => {
      if (!duplicate.includes(num)) {
        duplicate.push(num)
      }
    })
    if (props.type === "color") {
      if (duplicate.length !== 6) {
        setMsg("Please use 1-6 only once")
        setToastShow(true)
      } else {
        getInputs(inputNums, allInputs)
      }
    } else {
      if (duplicate.length !== 4) {
        setMsg("Please use 1-4 only once")
        setToastShow(true)
      } else {
        getInputs(inputNums, allInputs)
      }
    }
  }
  // this changes to the next question and also erases the values on the inputs
  const getInputs = (inputNums, allInputs) => {
    props.changeQuestion(inputNums)
    setInputNums([])
    for (let i = 0; i < allInputs.length; i++) {
      allInputs[i].value = ""
    }
  }
  return (
    <>
      <Form onSubmit={e => checkNumber(e)} className="d-flex flex-column align-items-center">
        {props.question.map((ques, idx) => {
          return <Form.Group key={idx}>
            <Form.Label className="container inputLabel"> {ques}</Form.Label>
            <Form.Control type="number" min="1" max={max} className="gameInputs mb-3" required />
          </Form.Group>
        })}
        <Toast onClose={() => setToastShow(false)} show={showToast} delay={3000} autohide>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
        <Button type="submit" className="mt-4 allBtn mb-4">Next</Button>
      </Form>
    </>
  )
}

export default QuizInputForm