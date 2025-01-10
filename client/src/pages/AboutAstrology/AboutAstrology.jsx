import React, { useState } from 'react'
import { Tab, Tabs, Button } from 'react-bootstrap'
import AboutAstrologyDesc from '../../components/AboutAstrologyDesc'
import AboutAstrologyLegends from '../../components/AboutAstrologyLegends'

const AboutAstrology = () => {
  // these are variables that are set to know which tab your clicking on (sun sign or legend)..or when your on the legends page it allows you to choose a sign to display the legend of that sign
  const [key, setKey] = useState('Sun');
  const [signs] = useState(["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"])
  const [currSign, setCurrSign] = useState("")
  return (
    <>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="justify-content-center"
      >
        <Tab eventKey="Sun" title="Sun Sign" className="tabKey">
        </Tab>
        <Tab eventKey="Legends" title="Legends" className="tabKey">
        </Tab>
      </Tabs>
      <h1 className="allPageTitles text-center" id="top">About Astrology</h1>
      {key === "Sun" ?
        <div>
          <AboutAstrologyDesc />
          <div className="topBtnDiv">
            <Button className="topBtn allBtn" href="#top">⬆️ Back</Button>
          </div>
          <footer className="fixed-bottom text-center aboutAstrologyFooter">
            <Button className="allBtn" href="#top">Back ⬆️</Button>
          </footer>
        </div>
        : key === "Legends" ?
          <div className="text-center container">
            <div className="row mt-5">
              {signs.map((sign, idx) => {
                return <div className="col-2" key={idx}>
                  <button type="button" className="legendBtn" value={sign} onClick={e => setCurrSign(e.target.value)}>{sign}</button>
                </div>
              })}
            </div>
            <AboutAstrologyLegends sign={currSign} />
            {currSign ? <button type="button" className="legendBtn mt-4" onClick={e => setCurrSign('')}>Back To Main Page</button> : ''}
          </div>
          : ""}
    </>
  )
}

export default AboutAstrology