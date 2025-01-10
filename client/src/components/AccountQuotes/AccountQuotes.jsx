import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Modal } from 'react-bootstrap'
import accountApi from '../../Api/account-api'
import AddQuoteForm from '../../components/AddQuoteForm'

const AccountQuotes = (props) => {
    // variables that are used to hide and show the modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    // deletes the quote from the users account
    const deleteQuote = (idx) => {
        props.user.quotes.splice(idx, 1)
        accountApi.saveQuotes(props.user._id, props.user.quotes).then(data => {
            props.changeStatus(true, data)
        })
    }
    return (
        <>
            <div className="text-center">
                <Button type="button" className="allBtn mt-5" onClick={handleShow}>Add Your Own</Button>
            </div>
            <div className="d-flex flex-wrap justify-content-center mt-5">
                {(props.user && props.user.quotes.length > 0) ? props.user.quotes.map((quote, idx) => {
                    return <div key={idx}>
                        <Card style={{ width: '16em' }} className="text-center mb-4">
                            <Card.Body>
                                <p className="cardQuote">{quote}</p>
                            </Card.Body>
                            <div>
                                <Button type="button" className="allBtn" onClick={e => deleteQuote(idx)}>Delete</Button>
                            </div>
                        </Card>
                    </div>
                }) : <h1 className="text-white container text-center mt-5">No quotes added to your profile yet. Head over to the <Link to="/" className="accountInfoLink">Main Page</Link> and save a quote or create your own.</h1>}
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add a quote</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddQuoteForm user={props.user} changeStatus={props.changeStatus} closeModal={handleClose}/>
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

export default AccountQuotes