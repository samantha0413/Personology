import React, { useState } from 'react'
import NumerologyForm from '../../components/NumerolgyForm'
import DisplayNumerologyResults from '../../components/DisplayNumeologyResults'

const Numerology = (props) => {
  // variables set and used throughout the page
  const [formComplete, setFormComplete] = useState(false)
  const [results, setResults] = useState(null)
  const [name, setName] = useState(null)
  // this runs only when the form is completely filled out and sets the results to the results variable
  const changeFormComplete = (status, results, name) => {
    setFormComplete(status)
    let finalResults = [
      {
        name: "Life Lesson Number",
        number: results[0]
      },
      {
        name: "Soul Number",
        number: results[1]
      },
      {
        name: "Outer Personality Number",
        number: results[2]
      },
      {
        name: "Path of Destiny Number",
        number: results[3]
      }
    ]
    setResults(finalResults)
    setName(name)
  }
  return (
    <>
      <div className="headerDiv text-center">
        <h1 className="allPageTitles">Numerology</h1>
      </div>
      {formComplete ?
        <DisplayNumerologyResults finalResult={results} status={props.status} user={props.user} name={name} from="numerologyPage" setFormComplete={setFormComplete} />
        : <NumerologyForm changeFormComplete={changeFormComplete} />}
    </>
  )
}

export default Numerology