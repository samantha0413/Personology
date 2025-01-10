import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import ShowAstroDesc from '../ShowAstroDesc'
import { Link } from "react-router-dom"
import FamilyTreeTable from '../FamilyTreeTable'
import astrologyApi from '../../Api/astrology-api'
import accountApi from '../../Api/account-api'

const AccountAstrology = (props) => {
  // all variables that are set on this page
  const [showFamily, setShowFamily] = useState(false);
  const handleFamilyClose = () => setShowFamily(false);
  const handleFamilyShow = () => setShowFamily(true);
  const [showDescription, setShowDescription] = useState(false)
  const [familyResults, setFamilyResults] = useState(null)
  const [familyName, setFamilyName] = useState(null)
  // shows the description for the family member chosen from the family tree table
  const showDesc = (e) => {
    let value = e.getAttribute("value")
    astrologyApi.getOneAstrology(props.user.familyAstrology[value].sign).then(data => {
      setFamilyResults(data.data[0])
      setShowDescription(true)
      setFamilyName(props.user.familyAstrology[value].name)
    })
  }
  // hides the description chosen and shows the family tree table again
  const showFamilyTable = () => {
    setShowDescription(false)
  }
  // removes the users astrology sign from their profile
  const removeResults = () => {
    accountApi.addAstrology(props.user._id, {}).then(data => {
      props.changeStatus(true, data.data)
    })
  }
  return (
    <>
      {(props.user.familyAstrology.length > 0 && props.user) ? <div className="text-center mt-4 mb-5"><Button className="allBtn" onClick={handleFamilyShow}>See Family Tree</Button></div> : ""}
      {props.user.astrology ? <div className="text-center mt-5 container">
        <h1 className="mb-4 astroTitle" >{props.user.astrology.date} </h1>
        <h1 className={`signTitle  mb-4`} >{props.user.astrology.sign}</h1>
        <h3 className={`astroTrait `} >Most Likeable Trait: {props.user.astrology.trait}</h3>
        <div className={`text-center `} >
          <ShowAstroDesc desc={props.user.astrology.desc} />
          <h3 className="astroTrait">The Inner You</h3>
          <p className="astroDescDiv">{props.user.astrology.inner}</p>
          <h3 className="astroTrait">How Others See You</h3>
          <p className="astroDescDiv">{props.user.astrology.others}</p>
        </div>
        <div className={`text-start`} >
          <ul className="astrologyUl">
            <li><strong className="strongWord">Duality: </strong> {props.user.astrology.duality}</li>
            <li><strong className="strongWord">Triplicity: </strong> {props.user.astrology.triplicity}</li>
            <li><strong className="strongWord">Quadruplicity: </strong> {props.user.astrology.quadruplicity[0]} <p className="m-0">{props.user.astrology.quadruplicity[1]}</p></li>
            <li><strong className="strongWord">Ruling Planet: </strong> {props.user.astrology.ruling}</li>
            <li><strong className="strongWord">Symbol: </strong> {props.user.astrology.symbol}</li>
            <li><strong className="strongWord">Glyph: </strong><img className="zodiacPic" src={props.user.astrology.glyph[0]} alt="zodiac sign"/><p>{props.user.astrology.glyph[1]}</p></li>
            <li><strong className="strongWord">Dominate Keyword: </strong> {props.user.astrology.dominant}</li>
            <li><strong className="strongWord">Polarity: </strong> {props.user.astrology.polarity}</li>
            <li><strong className="strongWord">Lucky Day: </strong> {props.user.astrology.day}</li>
            <li><strong className="strongWord">Lucky Numbers: </strong> {props.user.astrology.number}</li>
            <li><strong className="strongWord">Magical Birthstone: </strong> {props.user.astrology.birthstone}</li>
            <li><strong className="strongWord">Special Colors: </strong> {props.user.astrology.color}</li>
            <li><strong className="strongWord">Cities: </strong> {props.user.astrology.cities}</li>
            <li><strong className="strongWord">Countries: </strong> {props.user.astrology.countries}</li>
            <li><strong className="strongWord">Flowers: </strong> {props.user.astrology.flowers}</li>
            <li><strong className="strongWord">Trees: </strong> {props.user.astrology.trees}</li>
            <li><strong className="strongWord">Metal: </strong> {props.user.astrology.metal}</li>
            <li><strong className="strongWord">Animals Ruled By {props.user.astrology.sign}: </strong> {props.user.astrology.animals}</li>
            <li><strong className="strongWord">Danger: </strong> {props.user.astrology.danger}</li>
            <li><strong className="strongWord">Famous People With This Sign: </strong>{props.user.astrology.famous}</li>
          </ul>
        </div>
        <div className="text-center mt-5">
          <Button className="removeResultsLink" onClick={removeResults}>Remove Results</Button>
        </div>
      </div> : <h1 className="container mt-5 text-center accountInfoNoResults">There is not an Astrology sign saved to this account yet. To save one visit the <Link to='/astrology' className="accountInfoLink">Astrology Page</Link>.</h1>}

      <Modal show={showFamily} onHide={handleFamilyClose}>
        <Modal.Header closeButton>
          {showDescription ? <Modal.Title>{familyName}</Modal.Title> : <Modal.Title>Family Tree</Modal.Title>}
        </Modal.Header>
        <Modal.Title className="text-center"></Modal.Title>
        <Modal.Body className="text-center">
          {showDescription ? <div>
            <h1 className="mb-4" >{familyResults.date} </h1>
            <h1 className={`mb-4`} >{familyResults.sign}</h1>
            <h3  >Most Likeable Trait: {familyResults.trait}</h3>
            <div className={`text-center `} >
              <ShowAstroDesc desc={familyResults.desc} />
              <h3 >The Inner You</h3>
              <p className="astroDescDiv">{familyResults.inner}</p>
              <h3>How Others See You</h3>
              <p className="astroDescDiv">{familyResults.others}</p>
            </div>
            <div className={`text-start`}>
              <ul>
                <li><strong>Duality: </strong> {familyResults.duality}</li>
                <li><strong>Triplicity: </strong> {familyResults.triplicity}</li>
                <li><strong>Quadruplicity: </strong> {familyResults.quadruplicity[0]} <p className="m-0">{familyResults.quadruplicity[1]}</p></li>
                <li><strong>Ruling Planet: </strong> {familyResults.ruling}</li>
                <li><strong>Symbol: </strong> {familyResults.symbol}</li>
                <li><strong>Glyph: </strong><img className="zodiacPic" src={familyResults.glyph[0]} alt="zodiac sign"/><p>{familyResults.glyph[1]}</p></li>
                <li><strong>Dominate Keyword: </strong> {familyResults.dominant}</li>
                <li><strong>Polarity: </strong> {familyResults.polarity}</li>
                <li><strong>Lucky Day: </strong> {familyResults.day}</li>
                <li><strong>Lucky Numbers: </strong> {familyResults.number}</li>
                <li><strong>Magical Birthstone: </strong> {familyResults.birthstone}</li>
                <li><strong>Special Colors: </strong> {familyResults.color}</li>
                <li><strong>Cities: </strong> {familyResults.cities}</li>
                <li><strong>Countries: </strong> {familyResults.countries}</li>
                <li><strong>Flowers: </strong> {familyResults.flowers}</li>
                <li><strong>Trees: </strong> {familyResults.trees}</li>
                <li><strong>Metal: </strong> {familyResults.metal}</li>
                <li><strong>Animals Ruled By {familyResults.sign}: </strong> {familyResults.animals}</li>
                <li><strong>Danger: </strong> {familyResults.danger}</li>
                <li><strong>Famous People With This Sign: </strong>{familyResults.famous}</li>
              </ul>
            </div>
          </div> : props.user.familyAstrology.length > 0 ? <FamilyTreeTable changeStatus={props.changeStatus} user={props.user} showDesc={showDesc} from="astrology" /> : <h4>No family members added at this time.</h4>}
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

export default AccountAstrology