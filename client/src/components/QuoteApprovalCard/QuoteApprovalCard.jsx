import React from 'react'
import {Card, Button} from 'react-bootstrap'
// shows on the admin page under the quotes section
const QuoteApprovalCard = (props) => {
    return (
        <>
            <Card style={{width:"14em"}} className="m-auto text-center">
                <Card.Body>
                    <Card.Text>
                       {props.quote}
                    </Card.Text>
                    <div className="mt-4 d-flex justify-content-evenly">
                         <Button className="allBtn" value="approve" onClick={e => props.approveDelete(e.target.value, props.index, props.id)}>Approve</Button>
                    <Button className="allBtn" value="delete" onClick={e => props.approveDelete(e.target.value, props.index, props.id)}>Delete</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default QuoteApprovalCard