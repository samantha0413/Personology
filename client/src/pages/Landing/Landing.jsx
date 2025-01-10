import React, { useEffect, useState } from "react"
import quoteApi from '../../Api/quote-api'
import accountApi from '../../Api/account-api'
import { Toast } from 'react-bootstrap'

const Landing = (props) => {
    const [quote, setQuote] = useState(null)
    const [showToast, setToastShow] = useState(false);
    const [showSaveBtn, setShowSaveBtn] = useState(true)
    // this adds the id of landingPage to the body so that the page knows that the user is on the landing page and not the error page
    const fixStyling = () => {
        let page = document.getElementsByTagName("body")
        page[0].setAttribute('id', 'landingPage')
    }
    // runs the fixStyling function as soon as the page loads
    useEffect(() => {
        fixStyling()
        quoteApi.oneQuote().then(data => {
            setQuote(data.data.quote)
        })
    }, [])
    // saves quote to users account 
    const addQuote = () => {
        props.quotes.push(quote)
        accountApi.saveQuotes(props.user._id, props.quotes).then(data => {
            if (data.status === 200) {
                setShowSaveBtn(false)
                props.checkLoggedIn()
                setToastShow()
            }
        })
    }
    return (
        <>
            <div className="mainTitleDiv container">
                <h1 className="landingTitle">Personology</h1>
                <p className="text-center">All your personality traits discovered in one spot.</p>
            </div>
            <div className="text-center quoteDiv container d-flex justify-content-center align-items-center">
                <h3>{quote}</h3>
                {(props.user && showSaveBtn) ? <img src="../../images/pin2.png" onClick={addQuote} alt="purple pin"/> : ""}
            </div>
            <div className="d-flex justify-content-end container">
                <Toast className="text-center quoteToast" onClose={() => setToastShow(false)} show={showToast} delay={3000} autohide>
                    <Toast.Body>Quote added to account.</Toast.Body>
                </Toast>
            </div>

        </>
    )
}

export default Landing