import React from 'react'
import { Link } from 'react-router-dom'

function LogOut(props) {
    // function that logs the user out when the log out button is clicked
    const LoggingOut = () => {
        window.location.href ="/"
        props.changeStatus(false)
    }
    return (
        <>
            <Link onClick={LoggingOut} className="logOutLink">Log Out</Link>
        </>
    )
}

export default LogOut