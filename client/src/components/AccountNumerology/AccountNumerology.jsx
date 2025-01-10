import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { Button, Modal } from 'react-bootstrap'
import accountApi from '../../Api/account-api'
import api from '../../Api/numerology-api'
import FamilyTreeTable from '../FamilyTreeTable'

const AccountNumerology = (props) => {
  //  all the variables set for this component
  const [results, setResults] = useState()
  const [showFamily, setShowFamily] = useState(false);
  const handleFamilyClose = () => setShowFamily(false);
  const handleFamilyShow = () => setShowFamily(true);
  const [showDescription, setShowDescription] = useState(false)
  const [familyResults, setFamilyResults] = useState(null)
  const [familyName, setFamilyName] = useState(null)
  // this runs as soon as the page loads and gets the users numerology numbers (if the numbers exist) to display on their profile
  useEffect(() => {
    setTimeout(() => {
      if (props.user.numerology.length !== 0) {
        api.getNumerologyNums(props.user.numerology[0].result).then(data => {
          setResults(data.data)
        })
      }
    }, 10)
  }, [])
  // shows the description of saved family members numerology numbers
  const showDesc = (e) => {
    let value = e.getAttribute("value")
    api.getNumerologyNums(props.user.familyNumerology[value].result).then(data => {
      setFamilyResults(data.data)
      setShowDescription(true)
      setFamilyName(props.user.familyNumerology[value].name)
    })
  }
  // shows the family tree table
  const showFamilyTable = () => {
    setShowDescription(false)
  }
  // removes the users numerology numbers from their account
  const removeResults = () => {
    accountApi.addNumerology(props.user._id, []).then(data => {
      props.changeStatus(true, data.data)
    })
  }

  return (
    <>
      {(props.user && props.user.familyNumerology.length > 0) ?  <div className="text-center mt-4 mb-5"><Button className="allBtn" onClick={handleFamilyShow}>See Family Tree</Button></div> : ""}

      {results ? <div>
        <div className="mt-5">
          {results.map((results, idx) => {
            return <div className="container text-center" key={idx}><h1 className="accountInfo">{results.name}</h1><h2 className="accountNumerologyInfo">{results.number}</h2><p className="accountNumerologyDesc">{results.desc[0]}</p></div>
          })}
        </div>
        <div className="text-center mt-5">
          <Button className="removeResultsLink" onClick={removeResults}>Remove Results</Button>
        </div>
      </div> : <h1 className="container text-center mt-5 accountInfoNoResults">There aren't any Numerology results for this account. To fix this head over to the <Link to="/numerology" className="accountInfoLink">Numerology page</Link>.</h1>}

      <Modal show={showFamily} onHide={handleFamilyClose}>
        <Modal.Header closeButton>
          {showDescription ? <Modal.Title>{familyName}</Modal.Title> : <Modal.Title>Family Tree</Modal.Title>}
        </Modal.Header>
        <Modal.Title className="text-center"></Modal.Title>
        <Modal.Body className="text-center">
          {showDescription ? <div>
            {familyResults.map((result, idx) => {
              return <div key={idx}><h3>{result.name}</h3><p>{result.desc[0]}</p></div>
            })}
          </div> : (props.user && props.user.familyNumerology.length > 0) ? <FamilyTreeTable changeStatus={props.changeStatus} user={props.user} showDesc={showDesc} from="numerology" />
              : <h4>No family members added at this time.</h4>}
        </Modal.Body>
        <Modal.Footer>
          {showDescription ? <Button onClick={showFamilyTable}>Go Back</Button> : ""}
          <Button variant="secondary" onClick={handleFamilyClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AccountNumerology