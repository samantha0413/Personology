import React, { useState } from "react"
import { Form, Button } from 'react-bootstrap'
import accountApi from '../../Api/account-api'
import quoteApi from '../../Api/quote-api'

const AddQuoteForm = (props) => {
    // variable that stores the quote from the user
    const [addedQuote, setAddedQuote] = useState(null)
    // runs when the form is submitted and also adds the quote to the quotes saved to the account
    const addQuoteForm = (e) => {
        e.preventDefault()
        let checkBox = document.getElementById("terms")
        props.user.quotes.push(addedQuote)
        accountApi.saveQuotes(props.user._id, props.user.quotes).then(data => {
            props.changeStatus(true, data)
            props.closeModal()
        })
        if (checkBox.checked) {
            quoteApi.addUserQuote({ quote: addedQuote })
        }
    }
    return (
        <>
            <Form onSubmit={e => addQuoteForm
                (e)} className="text-center">
                <Form.Group>
                    <Form.Label className="addQuoteLabel">Type your quote below</Form.Label>
                    <Form.Control className="text-center" as="textarea" rows={3} onChange={e => setAddedQuote(e.target.value)} />
                </Form.Group>
                <div style={{ width: "18em" }} className="m-auto mt-3">
                    <Form.Check
                    id="terms"
                    className='quoteForm'
                        type="checkbox"
                        label={`I want my quote added to the website.`}

                    />
                </div>
                <Button type="submit" className="mt-3 submitBtn">Submit</Button>
            </Form>
        </>
    )
}

export default AddQuoteForm