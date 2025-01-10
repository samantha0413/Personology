import React, { useState, useEffect } from 'react'
import { Button, Modal, Card } from 'react-bootstrap'
import GameHistoryTable from '../GameHistoryTable'

const QuizHistory = props => {
    // variables set for this page to display the quizzes history
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [history, setHistory] = useState(null)
    // this shows the descripton of the most recent result of the quizzes you have taken..you can find this button on the quiz history on the account info page
    const handleShowDesc = () => {
        props.setShowDesc(true)
        props.setQuizDesc(history[0].result)
        props.setQuizTitle(props.name)
        if (props.name === "Myers-Briggs") {
            props.setQuizName("myers")
        } else {
            props.setQuizName(props.name.toLowerCase())
        }
    }
    // this runs as soon as the page loads and it sorts the quiz history from the most recent test result to the least recent test result..
    useEffect(() => {
        setHistory(props.history.sort((a, b) => b.time - a.time))
    }, [])
    return (
        <>
            <div className="mt-5 mx-3">
                <Card style={{ height: "21em" }}>
                    <Card.Body className="d-flex flex-column justify-content-between">
                        <Card.Title className="accountQuizTitle">{props.name}</Card.Title>
                        {(props.name === "Myers-Briggs" && history) ? <Card.Text className="text-white">{history[0].result[4].name}</Card.Text>
                            : history ? history[0].result.map((hist, idx) => {
                                return <Card.Text key={idx} className="text-white">{hist.name}</Card.Text>
                            }) : ""}
                        <div>
                            <Button type="button" className="allBtn me-3" onClick={handleShow}>Show History</Button>
                            <Button type="button" className="allBtn" onClick={handleShowDesc}>See Description</Button>
                        </div>
                    </Card.Body>
                </Card>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{props.name} Quiz History</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GameHistoryTable history={props.history} />
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

export default QuizHistory