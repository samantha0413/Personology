import React from 'react'
// this displays the question to the user..this component is called to myers-briggs and attached quizzes
const QuizQuestion = (props) => {
    return (
        <>
            <div className="container mb-5 mt-5">
                <h3 className="text-center">{props.ques}</h3>
            </div>
        </>
    )
}

export default QuizQuestion