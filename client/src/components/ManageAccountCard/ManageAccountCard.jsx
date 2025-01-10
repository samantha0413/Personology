import React from 'react'
import { Card, Button } from 'react-bootstrap'
// this card is called and used on the admin page for the accounts
const ManageAccountCard = (props) => {
    return (
        <>
            <Card className="m-auto text-center mb-5">
                <Card.Img variant="top" className="profilePicture m-auto" src={props.account.image} alt="account profile picture"/>
                <Card.Body className="text-white">
                    <Card.Text>
                        Name: {props.account.fName} {props.account.lName}
                    </Card.Text>
                    <Card.Text>
                        Email: {props.account.email}
                    </Card.Text>
                    <Card.Text>
                        id: {props.account._id}
                    </Card.Text>
                    <Card.Text>
                        Last Login: {props.account.lastLogin.slice(0, 10)}
                    </Card.Text>
                    <div className="mt-4 d-flex justify-content-evenly">
                        <Button className="allBtn" onClick={e => props.deleteAccount(props.account._id)}>Delete Account</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default ManageAccountCard