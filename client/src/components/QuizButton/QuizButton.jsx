import React from 'react'
import { Button } from 'react-bootstrap'
// these are the buttons that appear on 3 of my quizzes (love, attached, myers-briggs)
const QuizButton = (props) => {
    return (
        <>
            <Button type="button" onClick={e => props.changeQuestion(e.target.value)} value={props.answer[0]} className="quizBtn btn-lg">{props.question[0]}</Button>
            <Button type="button" onClick={e => props.changeQuestion(e.target.value)} value={props.answer[1]} className="quizBtn btn-lg">{props.question[1]}</Button>
        </>
    )
}

export default QuizButton