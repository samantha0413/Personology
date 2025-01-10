import React, { useState, useEffect } from "react"
// this component is called to the ResultsDiv component
const ResultsDesc = (props) => {
    // this a variable that is set to know which quiz the user is taking
    const [type, setType] = useState(null)
    // this sets the quiz name to type so that it knows how to display the results
    useEffect(() => {
        setType(props.type)
    }, [])
    return (
        <>
            {type === 'color' ? <div className="text-center">
                {props.description.map((desc, idx) => {
                    return <p key={idx}>{desc}</p>
                })}
            </div> :
                <div className="text-center">
                    <h3 className="titleDesc">{props.title ? props.title : ''}</h3>
                    {props.description.map((desc, idx) => {
                        return <p key={idx}>{desc}</p>
                    })}
                </div>}
        </>
    )
}

export default ResultsDesc