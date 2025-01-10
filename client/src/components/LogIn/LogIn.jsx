import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import api from '../../Api/auth-api'
import AccountForm from '../../components/AccountForm'

function LogIn(props) {
    // all the variables set on this compenent
    const [show, setShow] = useState(false)
    const handleClose = () => { setShow(false), setMsg('') }
    const handleShow = () => setShow(true)
    const [msg, setMsg] = useState('')
    const [password, setPassword] = useState(null)
    const [userName, setUserName] = useState(null)
    const [type, setType] = useState(null)
    // this allows the user to create an account if one doesn'y already exist..submits the create account form
    const addAccount = async (payload) => {
        await api.createAccount(payload).then(data => {
            let token = data.data.token
            localStorage.setItem('token', token)
            props.changeStatus(true, data.data)
            setMsg(data.data.message)
            handleShow()
        })
    }
    // this switches the modal from the create account form back to the login form
    const backToLogin = () => {
        setType("login")
    }
    // tells the app if the user is trying to login or create account..sets the type to either "login" or an empty string..if type is login then it shows the login form if empty string then it shows the create account form
    const changeType = (e) => {
        setType(e)
        handleShow()
    }
    // submits the login form for users who are trying to login to an existing account
    const user = (e) => {
        e.preventDefault()
        let payload = {
            name: userName,
            password: password
        }
        api.verifyAccount(payload).then(res => {
            if (!res.data.success) {
                setMsg(res.data.msg)
                setTimeout(() => setMsg(''), 3000)
            } else {
                let token = res.data.token
                localStorage.setItem('token', token)
                props.changeStatus(true, res.data)
            }
        })
    }
    return (
        <>
            <Button className="logInBtn mt-1" variant="primary" value="login" onClick={e => changeType(e.target.value)}>Log In</Button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    {type === "login" ? <Modal.Title>Sign In</Modal.Title> : <Modal.Title>Create Account</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    {type === "login" ? <form className="signInForm" onSubmit={(e) => user(e)}>
                        <div className="form-group">
                            <label htmlFor="userName">Email</label>
                            <input onChange={(e) => setUserName(e.target.value)} type='text' className="form-control" id="userName" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type='password' className="form-control" id="password" />
                            {/* <Link to='/resetPassword' onClick={handleClose}>Forgot Password?</Link> */}
                        </div>
                        <h4 className="errorMsg">{msg ? msg : ''}</h4>
                        <div className="submitBtnDiv text-center">
                            <Button type="submit" className="submitBtn">Sign In</Button>
                        </div>
                    </form> : <AccountForm addAccount={addAccount} convertPicture={props.convertPicture} image={props.image} />}
                </Modal.Body>
                {type === "login" ? <Modal.Footer>
                    <Button value="create" className="createAcctBtn" onClick={e => changeType(e.target.value)}>Don't Have an account? Sign up here</Button>
                </Modal.Footer> : <Modal.Footer>
                        <Button className="createAcctBtn" onClick={backToLogin}>Back to Login</Button>
                    </Modal.Footer>}
            </Modal>
        </>
    );
}
export default LogIn