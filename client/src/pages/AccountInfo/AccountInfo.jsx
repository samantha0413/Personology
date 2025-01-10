import React, { useState, useEffect } from "react"
import { Button, Modal, Form, Tabs, Tab, Toast } from 'react-bootstrap'
import api from '../../Api/account-api'
import QuizHistory from '../../components/QuizHistory'
import DisplayResults from '../../components/DisplayResults'
import AccountAstrology from '../../components/AccountAstrology'
import AccountNumerology from '../../components/AccountNumerology'
import AccountQuotes from '../../components/AccountQuotes'
import { Link } from 'react-router-dom'

const AccountInfo = (props) => {
    // all the variables that are used to change the users account information
    const [showToast, setToastShow] = useState(false);
    const [showDesc, setShowDesc] = useState(false)
    const [quizDesc, setQuizDesc] = useState(null)
    const [quizName, setQuizName] = useState(null)
    const [quizTitle, setQuizTitle] = useState(null)
    const [key, setKey] = useState('home');
    const [showAccount, setAccountShow] = useState(false);
    const [email, setEmail] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [password, setPassword] = useState(null)
    const [newPassword, setNewPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [confirmDelete, setConfirmDelete] = useState(false)
    const [msg, setMsg] = useState(null)
    const [editType, setEditType] = useState(null)
    // this is the functions that show and close the modal used for all 4 (profile picture, password, delete, and user info) edit options
    const handleAccountShow = () => setAccountShow(true);
    const handleAccountClose = () => {
        setAccountShow(false)
        setConfirmDelete(false)
    };
    // this sets the current users information to the variables so its easier for the user to change in the form
    const showChangeAccount = (value) => {
        setEditType(value)
        setEmail(props.user.email)
        setFirstName(props.user.fName)
        setLastName(props.user.lName)
        handleAccountShow()
    }
    // this function edits the account in many different ways.,it allows you to delete your account, edit you account (first name, last name, email), change the password to the account and also change the profile picture..the editType variable changes based on what button is clicked on
    const changeAccountInfo = (e) => {
        e.preventDefault()
        if (editType === "edit") {
            let re = /^./i
            let fname = firstName.match(re)[0].toUpperCase()
            let newFirstName = firstName.replace(re, fname)
            let lname = lastName.match(re)[0].toUpperCase()
            let newLastName = lastName.replace(re, lname)
            let user = {
                fName: newFirstName,
                lName: newLastName,
                email: email
            }
            api.editAccount(props.user._id, user).then(data => {
                if (data.data.success) {
                    props.changeStatus(true, data.data)
                    handleAccountClose()
                } else {
                    setMsg(data.data.msg)
                }
            })
        } else if (editType === "password") {
            if (confirmPassword === newPassword) {
                let passwordRe = /^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[\d]).*/g
                if (newPassword.match(passwordRe)) {
                    let info = {
                        password: password,
                        newPassword: newPassword
                    }
                    api.changePassword(props.user._id, info).then(data => {
                        if (data.data.success) {
                            setMsg(data.data.msg)
                            setTimeout(() => {
                                handleAccountClose()
                            }, 1500)
                        } else {
                            setMsg(data.data.msg)
                        }
                    })
                } else {
                    setToastShow(true)
                }
            }
        } else if (editType === "delete") {
            api.deleteAccount(props.user._id, password).then(data => {
                if (data.data.success) {
                    handleAccountClose()
                    localStorage.clear()
                    window.location.href = "/"
                } else {
                    setMsg(data.data.msg)
                    setConfirmDelete(false)
                }
            })
        } else if (editType === "picture") {
            let pic = {
                image: props.image
            }
            api.changePicture(props.user._id, pic).then(data => {
                props.changeStatus(true, data)
                handleAccountClose()
            })
        }
        setTimeout(() => {
            setMsg(null)
        }, 3000)
    }
    // this removes the smallActive class from buttons so that there is not more than 1 button active at a time
    const removeClass = () => {
        let allBtns = document.getElementsByClassName("navBtn")
        for (let i = 0; i < allBtns.length; i++) {
            if (allBtns[i].classList.length === 2) {
                allBtns[i].classList.remove('smallActive')
            }
        }
    }
    // this changes the small nav buttons to set the active on depending on what is active on the bigger screens
    const changeActiveButton = () => {
        removeClass()
        document.getElementById(`${key}`).classList.add('smallActive')
    }
    // checks to see if the window has resized so it can change the active button
    window.addEventListener("resize", function () {
        changeActiveButton()
    })
    // runs as soon as the page loads
    useEffect(() => {
        changeActiveButton()
    }, [])

    // this asks if you're sure you want to delete your account 
    const deleteConfirm = () => {
        setConfirmDelete(true)
    }
    // this takes you back to seeing all the quizzes history instead of the quiz description
    const unSetDesc = () => {
        setShowDesc(false)
    }
    // this changes between the tabs at the top of the page
    const changingKeys = (e) => {
        setKey(e)
        if (e !== "quizzes") {
            setShowDesc(false)
            setQuizName(null)
        }
    }
    // this is for the tabs on the page. I had to make a second nav to make it look right on a smaller screen
    const smallScreenNavBtn = (e, value) => {
        removeClass()
        e.target.classList.add('smallActive')
        setKey(value)
    }
      // closes the toast when the user clicks on the X button
      const closePasswordToast = () => {
        setToastShow(false)
    }
    return (
        <>
            <div>
                <h1 className="allPageTitles text-center">Account Info</h1>
            </div>
            <div className="smallScreenNav text-center">
                <button type="button" className="navBtn" id="home" aria-pressed="true" value="home" onClick={e => smallScreenNavBtn(e, e.target.value)}>Account Info</button>
                <button className="navBtn" id="quizzes" value="quizzes" onClick={e => smallScreenNavBtn(e, e.target.value)}>Quizzes</button>
                <button className="navBtn" id="astrology" value="astrology" onClick={e => smallScreenNavBtn(e, e.target.value)}>Astrology</button>
                <button className="navBtn " id="numerology" value="numerology" onClick={e => smallScreenNavBtn(e, e.target.value)}>Numerology</button>
                <button className="navBtn " id="quotes" value="quotes" onClick={e => smallScreenNavBtn(e, e.target.value)}>Quotes</button>
            </div>
            <Tabs
                id="tabs"
                activeKey={key}
                onSelect={(k) => changingKeys(k)}
                className="justify-content-center mt-5 accountTabs"
            >
                <Tab eventKey="home" title="Account Info" />
                <Tab eventKey="quizzes" title="Quizzes" />
                <Tab eventKey="astrology" title="Astrology" />
                <Tab eventKey="numerology" title="Numerology" />
                <Tab eventKey="quotes" title="Quotes" />
            </Tabs>
            {key === "quizzes" ?
                <div className="container text-center">
                    {showDesc ? <h1 className="allPageTitles">{quizTitle}</h1> : ""}
                    <div className="d-flex flex-wrap justify-content-around mt-2">
                        {(props.user && props.user.history.length == 0) ? <div className="container mt-5"><h1 className="accountInfoNoResults">There are no quiz results to display. To fix this head over to one of the quizzes below and take the quiz.</h1><div className="mt-5 row d-flex justify-content-center">
                            <Link to="/love" className="accountInfoLinks  col-sm-5 col-md-4 mt-3">Love</Link>
                            <Link to="/attached" className="accountInfoLinks col-sm-5 col-md-4 mt-3">Attached</Link>
                            <Link to="/color" className="accountInfoLinks col-sm-5 col-md-4 mt-3">Color</Link>
                            <Link to="/intelligence" className="accountInfoLinks col-sm-5 col-md-4 mt-3">Intelligence</Link>
                            <Link to="/Myers-Briggs" className="accountInfoLinks col-sm-5 col-md-4 mt-3">Myers-Briggs</Link>
                            <Link to="/animal" className="accountInfoLinks col-sm-5 col-md-4 mt-3">Animal</Link>
                            <Link to="/fruit" className="accountInfoLinks col-sm-5 col-md-4 mt-3">Fruit</Link>
                        </div></div> :
                            (props.user && !showDesc) ?
                                props.user.history.map((cat, idx) => {
                                    return <QuizHistory
                                        key={idx}
                                        name={cat.name}
                                        history={cat.history}
                                        setShowDesc={setShowDesc}
                                        setQuizDesc={setQuizDesc}
                                        setQuizName={setQuizName}
                                        setQuizTitle={setQuizTitle}
                                    />
                                })
                                : showDesc ? <div><DisplayResults type={quizName} finalResult={quizDesc} status={true} /> <Button type="button" className="allBtn mt-5 mb-4" onClick={unSetDesc}>Return To Quizzes</Button></div> : ''}
                    </div>
                </div> : key === "astrology" ? <AccountAstrology user={props.user} changeStatus={props.changeStatus} /> :
                    key === "numerology" ? <AccountNumerology from="accountPage" user={props.user} changeStatus={props.changeStatus} /> :
                        (key === "home" && props.user) ?
                            <div>
                                <div className="d-flex justify-content-evenly container">
                                    <div className="text-center mt-5 d-flex flex-column">
                                        <Button className="accountBtn mb-3" value="edit" onClick={e => showChangeAccount(e.target.value)}>Edit Account</Button>
                                        <Button className="accountBtn mb-3" value="password" onClick={e => showChangeAccount(e.target.value)}>Change Password</Button>
                                        <Button className="accountBtn mb-3" value="delete" onClick={e => showChangeAccount(e.target.value)}>Delete Account</Button>
                                        <Button className="accountBtn" value="picture" onClick={e => showChangeAccount(e.target.value)}>Change Picture</Button>
                                    </div>
                                    <div className="text-center mt-5">
                                        <div className="text-center mb-4"><img src={props.user.image} className="profilePicture" alt="profile picture" /></div>
                                        <h1 className="accountInfo"><span className="accountInfoSpan">First Name:</span> {props.user.fName}</h1>
                                        <h1 className="accountInfo"><span className="accountInfoSpan">Last Name:</span> {props.user.lName}</h1>
                                        <h1 className="accountInfo"><span className="accountInfoSpan">Email:</span> {props.user.email}</h1>
                                    </div>
                                </div>
                            </div> : key === "quotes" ? <AccountQuotes user={props.user} changeStatus={props.changeStatus} /> : ""}

            < Modal
                show={showAccount}
                onHide={handleAccountClose}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    {editType === "edit" ? <Modal.Title>Edit Account</Modal.Title> : editType === "password" ? <Modal.Title>Change Password</Modal.Title> : editType === "delete" ? <Modal.Title>Delete Account</Modal.Title> : editType === "picture" ? <Modal.Title>Change Profile Picture</Modal.Title> : ""}
                </Modal.Header>
                <Modal.Body>
                    {editType === "edit" ? <Form onSubmit={e => changeAccountInfo(e)}>
                        <Form.Group>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName ? firstName : ""} onChange={e => setFirstName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName ? lastName : ""} onChange={e => setLastName(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" value={email ? email : ""} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>
                        <div className="text-center mt-5">
                            <Button type="submit">Edit Account</Button>
                        </div>
                    </Form> : editType === "password" ? <Form onSubmit={e => changeAccountInfo(e)}>
                        <Form.Group>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} required placeholder="********" />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" onChange={e => setNewPassword(e.target.value)} required placeholder="At least 8 characters"/>
                        </Form.Group>
                        <Toast className="text-center createToast m-auto" show={showToast}>
                            <Toast.Body>
                                <div>
                                    <ul className="requirements">
                                        <li>An uppercase letter.</li>
                                        <li>A lower case letter.</li>
                                        <li>At least one number</li>
                                    </ul>
                                </div>
                                <div>
                                    <Button className="createAccountToastBtn" onClick={closePasswordToast}>X</Button>
                                </div>
                            </Toast.Body>
                        </Toast>
                        <Form.Group>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" onChange={e => setConfirmPassword(e.target.value)} required required placeholder="********"/>
                        </Form.Group>
                        <div className="text-center mt-5">
                            <Button type="submit">Change Password</Button>
                        </div>
                    </Form> : confirmDelete ? <div className="text-center"><h2>Are you sure you want to delete your account?</h2><div className="d-flex justify-content-evenly mt-5">
                        <Button onClick={changeAccountInfo}>Yes</Button><Button onClick={handleAccountClose}>No</Button></div>
                    </div> : editType === "delete" ? <Form>
                        <Form.Group>
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" onChange={e => setPassword(e.target.value)} required />
                        </Form.Group>
                        <div className="text-center mt-5">
                            <Button type="button" onClick={deleteConfirm}>Delete Account</Button>
                        </div>
                    </Form> : editType === "picture" ? <Form onSubmit={e => changeAccountInfo(e)}>
                        <Form.Group className="mt-3">
                            <Form.Control onChange={(e) => props.convertPicture(e.target.files[0])} type="file" required />
                        </Form.Group>
                        <div className=" mt-5 text-center">
                            <Button type="submit">Submit</Button>
                        </div>
                    </Form> : ""}
                </Modal.Body>
                {msg ? <Modal.Footer>{msg}</Modal.Footer> : ""}
            </Modal>
        </>
    )
}

export default AccountInfo