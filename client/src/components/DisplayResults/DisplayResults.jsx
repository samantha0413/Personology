import React, { useEffect, useState } from 'react'
import descriptionApi from '../../Api/description-api'
import ResultsDiv from '../ResultsDiv'
// displays the quiz results for whichever quiz was took
const DisplayResults = (props) => {
    //    variables set on this components
    const [results, setResults] = useState(null)
    const [subTitles] = useState(["You Are:", "Mind:", "Energy:", "Nature:", "Tactics:"])
    // this runs as soon as the component loads..gets the quiz description for whatever quiz the user took and sets the results variable with the results
    useEffect(() => {
        if (props.type !== "numerology") {
            descriptionApi.getQuizDescription(props.finalResult, props.type).then(data => {
                setResults(data.data)
            })
        }
    }, [])
    return (
        <>
            <div className="text-center results mb-5 pb-3">
                <h1>Results</h1>
                <h4 className="text-center mt-4 text-white container">Click on a category below to see/close the description for each of your numbers</h4>
            </div>
            {(results && props.status) ? results.map((result, idx) => {
                return <ResultsDiv
                    key={idx}
                    type={props.type}
                    desc={result.desc}
                    name={result.name}
                    subTitles={props.type === "myers" ? subTitles[idx] : ""}
                />
            }) : <h1 className="text-center text-white">Please login or create an account to see your results.</h1>}
        </>
    )
}

export default DisplayResults