import React, { useEffect } from "react"
import { Link } from 'react-router-dom'
import './ErrorPage.css'

const ErrorPage = () => {
    // this adds the id of errorPage to the body so that the page knows that the user is on the error page and not the landing page
    const fixStyling = () => {
        let page = document.getElementsByTagName("body")
        page[0].setAttribute('id', 'errorPage')
    }
    // runs the fixStyling function as soon as the page loads
    useEffect(() => {
        fixStyling()
    })
    return (
        <>
            <div className="container text-center mt-5">
                <h1 className="text-white">The Cosmos are not in your favor. Please head back to the main page.</h1>
                <div className="mt-5">
                    <Link to="/" className="homeLink">Home Page</Link>
                </div>
            </div>
        </>
    )
}

export default ErrorPage