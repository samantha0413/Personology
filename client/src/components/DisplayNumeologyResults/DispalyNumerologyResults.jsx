import React, { useState, useEffect } from 'react'
import api from '../../Api/numerology-api'
import { Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import accountApi from '../../Api/account-api'
import moment from 'moment'

const DisplayNumerologyResults = (props) => {
  // all variables set for this component
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [results, setResults] = useState(null)
  const [msg, setMsg] = useState(null)
  const [resultsAdded, setResultsAdded] = useState(false)
  // loads as soon the component loads..gets the description for the users numerology numbers
  useEffect(() => {
    api.getNumerologyNums(props.finalResult).then(data => {
      setResults(data.data)
    })
  }, [])
  // shows the description for whatever numerology number is clicked on
  const showResults = (e, idx) => {
    let h1 = document.querySelector(`.number${idx}`)
    let p = document.querySelector(`.desc${idx}`)
    h1.toggleAttribute('hidden')
    p.toggleAttribute('hidden')
  }
  // adds the numerology results to either the users profile (their own results) or to the users family tree (family member)
  const addResultsToAccount = (value) => {
    if (value === "family") {
      let arr = props.user.familyNumerology
      arr.push({ name: props.name, result: props.finalResult })
      accountApi.updateFamilyNumerology(props.user._id, { info: arr }).then(data => {
        if (data.data.success) {
          setMsg("Results added")
          eraseMsg()
        } else {
          setMsg(data.data.msg)
        }
      })
    } else {
      accountApi.addNumerology(props.user._id, { date: moment().format("M-DD-YY"), result: props.finalResult }).then(data => {
        if (data.data.success) {
          setMsg("Results added")
          eraseMsg()
        } else {
          setMsg(data.data.msg)
        }
      })
    }
  }
  // erases the message letting the user know the numerology numbers were added to their profile
  const eraseMsg = () => {
    setTimeout(() => {
      setMsg("")
      setResultsAdded(true)
    }, 900)
  }
  return (
    <>
      <div className="d-flex align-items-center flex-column results pb-3">
        <h1 className="text-center">Results</h1>
        <Button className="numberDescBtn" onClick={handleShow}>What do the Numbers mean?</Button>
        {props.from === "numerologyPage" ? <Link onClick={e => props.setFormComplete(false)} className="mt-4 accountInfoLink">Back to Numerology</Link> : ""}
        <h5 className="text-center mt-4 text-white">Click on a category below to see/close the description for each of your numbers</h5>
      </div>
      {(props.from === "numerologyPage" && !resultsAdded) ? <div className="text-center mt-4"><h5 className="text-white">Add Results to:</h5><div className="d-flex justify-content-evenly">
        <Button value="family" className="allBtn" onClick={e => addResultsToAccount(e.target.value)}>Family Tree</Button>
        <Button value="profile" className="allBtn" onClick={e => addResultsToAccount(e.target.value)}>My Profile</Button>
      </div>{msg ? <h6 className="text-white mt-4">{msg}</h6> : ""}</div> : ""}
      {results ? results.map((result, idx) => {
        return <div key={idx} className="text-center container mt-5">
          <h1 className="allNumTitle" onClick={e => showResults(e, idx)}>{result.name}</h1>
          <h1 className={`number${idx} allNum`} hidden>{result.number}</h1>
          <p className={`desc${idx} allDesc`} hidden>{result.desc[0]}</p>
        </div>
      }) : ""}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Title className="text-center">The Life Lesson Number</Modal.Title>
        <Modal.Body className="text-center">
          It represents the lessons you must learn in this lifetime and is most significant in your choice of a career.
        </Modal.Body>
        <Modal.Title className="text-center">The Soul Number</Modal.Title>
        <Modal.Body className="text-center">
          Your soul number is your real personality, the you that is known only to you. If one embraces the philosophy of reincarnation, the Soul Number also indicates what you have been in previous lifetimes. This part of your personaliy is not easily recognized by others unless they know you very well. The Soul Number is what you, in you inner secret self, desire to be. This urge may be so strong that it can overcome other vibrations in your four basic numbers.
        </Modal.Body>
        <Modal.Title className="text-center">The Outer Personality Number</Modal.Title>
        <Modal.Body className="text-center">
          Your outer personaliy number indicates how you appear to others; it is not necessarily what you are. The outer personaliy number also shows what people expect from you because of the image you present.
        </Modal.Body>
        <Modal.Title className="text-center">The Path of Destiny Number</Modal.Title>
        <Modal.Body className="text-center">
          This number respresents your aim in life; in other words, it shows the path you must walk, what you should accomplish, what you must be.
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

export default DisplayNumerologyResults