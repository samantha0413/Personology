import React, { useEffect, useState } from 'react'
import api from '../../Api/quiz-api'
import QuizQuestion from '../../components/QuizQuestion'
import QuizButton from '../../components/QuizButton'
import DisplayResults from '../../components/DisplayResults'
import { Button, Modal } from 'react-bootstrap'

const MyersBriggs = (props) => {
  // variables set and used throughout the page
  const [myersQuestions, setMyersQuestions] = useState(null)
  const [count, setCount] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [allAnswers] = useState(Array(70).fill(null))
  const [finalArr] = useState(Array(4).fill(null))
  // variables set and used for the modal that displays how to play the game
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // this is where the quiz questions are retrieved from the database and set to a variable
  useEffect(() => {
    api.getQuestions('myers').then(data => {
      setMyersQuestions(data.data)
    })
  }, [])
  // this changes the questions and adds the users answers to the allAnswers variable..this also checks to see if the user has reached the end of the quiz
  const changeQuestion = (ans) => {
    allAnswers[count] = ans
    setCount(count + 1)
    if (count === 69) {
      setGameOver(true)
      let column1 = [allAnswers[0], allAnswers[7], allAnswers[14], allAnswers[21], allAnswers[28], allAnswers[35], allAnswers[42], allAnswers[49], allAnswers[56], allAnswers[63]]
      let column2 = [allAnswers[1], allAnswers[8], allAnswers[15], allAnswers[22], allAnswers[29], allAnswers[36], allAnswers[43], allAnswers[50], allAnswers[57], allAnswers[64], allAnswers[2], allAnswers[9], allAnswers[16], allAnswers[23], allAnswers[30], allAnswers[37], allAnswers[44], allAnswers[51], allAnswers[58], allAnswers[65]]
      let column3 = [allAnswers[3], allAnswers[10], allAnswers[17], allAnswers[24], allAnswers[31], allAnswers[38], allAnswers[45], allAnswers[52], allAnswers[59], allAnswers[66], allAnswers[4], allAnswers[11], allAnswers[18], allAnswers[25], allAnswers[32], allAnswers[39], allAnswers[46], allAnswers[53], allAnswers[60], allAnswers[67]]
      let column4 = [allAnswers[5], allAnswers[12], allAnswers[19], allAnswers[26], allAnswers[33], allAnswers[40], allAnswers[47], allAnswers[54], allAnswers[61], allAnswers[68], allAnswers[6], allAnswers[13], allAnswers[20], allAnswers[27], allAnswers[34], allAnswers[41], allAnswers[48], allAnswers[55], allAnswers[62], allAnswers[69]]
      getTotal(column1, 0)
      getTotal(column2, 1)
      getTotal(column3, 2)
      getTotal(column4, 3)
    }
  }
  // this runs once the quiz is over and it adds the users answers to see how many A's and B's were in each column
  const getTotal = (arr, idx) => {
    let newColumn = {}
    for (let i = 0; i < arr.length; i++) {
      if (newColumn.hasOwnProperty(arr[i])) {
        newColumn[arr[i]]++
      } else {
        newColumn[arr[i]] = 1
      }
    }
    if (newColumn.A > newColumn.B) {
      finalArr[idx] = "A"
    } else {
      finalArr[idx] = "B"
    }
    if (finalArr[0] && finalArr[1] && finalArr[2] && finalArr[3]) {
      getLetters(finalArr)
    }
  }
  // this runs after the getTotal function and it checks to see if the A's or B's was higher and which ever one is higher it assigns the correct letter to get the users result
  const getLetters = (arr) => {
    let end = ""
    let complete = {}
    for (let letter in arr) {
      if (letter === "0") {
        if (arr[letter] === "A") {
          end += "E"
          complete.Extraverted = 0
        } else {
          end += "I"
          complete.Introverted = 0
        }
      } else if (letter === "1") {
        if (arr[letter] === "A") {
          end += "S"
          complete.Sensing = 0
        } else {
          end += "N"
          complete.Intuitive = 0
        }
      } else if (letter === "2") {
        if (arr[letter] === "A") {
          end += "T"
          complete.Thinking = 0
        } else {
          end += "F"
          complete.Feeling = 0
        }
      } else if (letter == "3") {
        if (arr[letter] === "A") {
          end += "J"
          complete.Judging = 0
        } else {
          end += "P"
          complete.Perceiving = 0
        }
      }
    }
    complete[end] = 0
    props.getResults('Myers-Briggs', complete)
  }
  return (
    <>
      <div className="text-center">
        <h1 className="allPageTitles">Myers-Briggs Quiz</h1>
        {!gameOver ? <Button type="button" className='allBtn mt-4' onClick={handleShow}>Questions?</Button> : ""}
      </div>
      {gameOver ? <DisplayResults type="myers" finalResult={props.results} status={props.status} /> : myersQuestions ?
        <div>
          <div className="text-center mt-5 container mb-5"><h4 className="counter">Question {count + 1} of {myersQuestions.length}</h4></div>
          <div className="myersQuesDiv container">
            <QuizQuestion ques={myersQuestions[count].question[0]} />
            <div className="myersBtnDiv"><QuizButton
              question={myersQuestions[count].answers}
              answer={["A", "B"]}
              changeQuestion={changeQuestion}
            />
            </div>
          </div>
        </div> : ""}

      <Modal show={show} onHide={handleClose} className="text-center">
        <Modal.Header closeButton>
          <Modal.Title>Instructions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you have not yet created an account to be able to login please do that now before taking the quiz. Otherwise you will not be able to see your results.
                </Modal.Body>
        <Modal.Title>Once you are logged in...</Modal.Title>
        <Modal.Body>
          Choose the answer that is true for you, but both answers may be true for you, and in that case pick the one that is most often lean towards.
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

export default MyersBriggs