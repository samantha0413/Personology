import React, { useState } from "react"
import { Form, Button, Toast } from "react-bootstrap"
import api from '../../Api/account-api'

const AccountForm = (props) => {
    // all the variables that are set for the user to create an account
    const [showToast, setToastShow] = useState(false);
    const [emailMsg, setEmailMsg] = useState(null)
    const [emailIcon, setEmailIcon] = useState(null)
    const [email, setEmail] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirm, setConfirm] = useState(null)
    const [image, setImage] = useState(null)
    const [seeDefaultPic, setSeeDefaultPic] = useState(false)
    const [userChooseDefault, setUserChooseDefault] = useState(false)
    const [pictures] = useState(["../images/angryCat.jpeg", "../images/lion.jpeg", "../images/blackDog.jpeg", "../images/cutePuppy.jpeg", "../images/cuteToast.jpeg", "../images/dolphin.jpeg", "../images/fish.jpeg", "../images/flower.jpeg", "../images/greenEyes.jpeg", "../images/happyDog.jpeg", "../images/heart.jpeg", "../images/jellyFish.jpeg", "../images/squirrel.jpeg", "../images/leopard.jpeg", "../images/smoke.jpeg", "../images/llama.jpeg", "../images/monkeyBanana.jpeg", "../images/monkeyMirror.jpeg", "../images/newt.jpeg", "../images/owl.jpeg", "../images/paperClip.jpeg", "../images/peacock.jpeg", "../images/penguin.jpeg", "../images/pitbull.jpeg", "../images/pitbull2.jpeg", "../images/snake.jpeg", "../images/yoda.jpeg", "../images/zebra.jpeg"])
    // submits the users form to create their account
    const submit = (e) => {
        e.preventDefault()
        if (password === confirm) {
            let re = /^./i
            let fname = firstName.match(re)[0].toUpperCase()
            let newFirstName = firstName.replace(re, fname)
            let lname = lastName.match(re)[0].toUpperCase()
            let newLastName = lastName.replace(re, lname)
            let passwordRe = /^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[\d]).*/g
            if (password.match(passwordRe)) {
                let user = {
                    fName: newFirstName,
                    lName: newLastName,
                    email: email,
                    password: password,
                    history: [],
                    numerology: [],
                    astrology: {},
                    image: props.image ? props.image : image,
                    lastLogin: new Date().toISOString()
                }
                props.addAccount(user)
            } else {
                setToastShow(true)
            }
        }
    }
    // checks to see if the email trying to be used already exists
    const checkIfValid = (e) => {
        let email = e
        setEmail(email)
        let re = /[.com]{4}/g
        if (email.match(re)) {
            api.checkIfEmailValid({ email: email }).then(res => {
                if (!res.data.success) {
                    setEmailIcon("❌")
                    setEmailMsg(res.data.message)
                }
                else {
                    setEmailIcon("✅")
                    setEmailMsg(res.data.message)
                }
            })
        }
    }
    // allows the user to choose a default image for their profile picture if they do not have one righ then they want to use
    const chooseDefaultPic = (pic) => {
        setUserChooseDefault(true)
        setImage(pic)
        setSeeDefaultPic(false)
    }
    // shows the password requirements in a toast
    const showPasswordToast = () => {
        setToastShow(true)
    }
    // closes the toast when the user clicks on the X button
    const closePasswordToast = () => {
        setToastShow(false)
    }
    return (
        <>
            {!seeDefaultPic ? <div className="accountFormDiv text-center">
                <Form onSubmit={(e) => submit(e)}>
                    <Form.Group>
                        <Form.Label htmlFor="profilePicture">Profile Picture</Form.Label>
                        {userChooseDefault ? <div className="d-flex flex-column align-items-center"><img src={image} className="profilePicture" alt="profile picture"/><Button type="button" onClick={e => setUserChooseDefault(false)} className="chooseBtn">Choose/Add different picture</Button></div> : <div><Form.Control onChange={(e) => props.convertPicture(e.target.files[0])} type="file" required />
                            <Button type="button" className="chooseBtn" value="defaultPic" onClick={e => setSeeDefaultPic(true)}>No picture yet? Choose a default picture</Button></div>}
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="firstName">First Name</Form.Label>
                        <Form.Control onChange={(e) => setFirstName(e.target.value)} type="text" required placeholder="John" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control onChange={(e) => setLastName(e.target.value)} type="text" required placeholder="Smith" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control onChange={(e) => checkIfValid(e.target.value)} type="email" name="email" required autoComplete="no" placeholder="john-smith@gmail.com" />
                    </Form.Group>
                    <div className="mb-2">
                        {email ? <h6 className="mt-3 mb-3">{emailIcon} {emailMsg}</h6> : ''}
                    </div>
                    <Form.Group>
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" id="password" placeholder="At least 8 characters" required onClick={showPasswordToast} />
                        <Toast className="text-center createToast" show={showToast}>
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
                    </Form.Group>
                    <Form.Group>
                        <Form.Label htmlFor="confirm">Confirm Password</Form.Label>
                        <Form.Control onChange={(e) => setConfirm(e.target.value)} type="password" id="confirm" required placeholder="********" />
                    </Form.Group>
                    <div className="submitBtnDiv">
                        <Button type="submit" className="submitBtn mt-4">Submit</Button>
                    </div>
                </Form>
            </div> : <Form>
                    <div className="text-center">
                        {pictures.map((pic, idx) => {
                            return <img key={idx} src={pic} className="profilePicture" onClick={e => chooseDefaultPic(pic)} alt="profile picture"/>
                        })}
                        <Button type="button" className="chooseBtn mt-4" onClick={e => setSeeDefaultPic(false)}>Back to create Account</Button>
                    </div>
                </Form>}
        </>
    )
}

export default AccountForm