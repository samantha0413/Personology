import React from 'react'
import { Form } from 'react-bootstrap'
// this is the checkbox that is used for the intelligence test
const QuizCheckbox = (props) => {
    return (
        <>
            {props.answers ? props.answers.map((ans, idx) => {
                return <Form.Check
                    className="mt-3 text-center mx-5 intelligenceQuiz"
                    type="checkbox"
                    label={ans}
                    key={idx}
                />
            }) : ""}
        </>
    )
}

export default QuizCheckbox