import React, { useEffect, useState } from 'react'
import api from '../../Api/astrology-api'
import accountApi from '../../Api/account-api'
import ShowAstroDesc from '../../components/ShowAstroDesc'
import { Button, Form } from "react-bootstrap"

const Astrology = (props) => {
    //  variables that are set and used throughout this page
    const [astrology, setAstrology] = useState(null)
    const [msg, setMsg] = useState("")
    const [familyName, setFamilyName] = useState(null)
    // this gets and sets all 12 astrology signs from the database
    useEffect(() => {
        api.seedAstrology().then(data => {
            setAstrology(data.data)
        })
    }, [])
    // this shows the description for which ever astrology sign you click on
    const showAstro = (idx) => {
        document.body.querySelector(`.trait${idx}`).toggleAttribute("hidden")
        document.body.querySelector(`.desc${idx}`).toggleAttribute("hidden")
        document.body.querySelector(`.ul${idx}`).toggleAttribute("hidden")
        document.body.querySelector(`.title${idx}`).toggleAttribute("hidden")
        document.body.querySelector(`.pin${idx}`).toggleAttribute("hidden")
    }
    // this shows the buttons that ask the user if they want to add the astrology sign to their profile or if its a family members sign
    const showBtns = (idx) => {
        if (props.status) {
            document.body.querySelector(`.addAstrologyBtns${idx}`).toggleAttribute("hidden")
        }
    }
    // this shows the familty form to add the family members name and sign to the account or it adds the astrology sign to the users profile as their sign..it depends on which button is clicked on presented with the 2 buttons
    const addingAstrology = (value, idx) => {
        if (value === "family") {
            document.body.querySelector(`.familyForm${idx}`).toggleAttribute("hidden")
            document.body.querySelector(`.pinBtn${idx}`).classList.add('hide')
        } else if (value === "profile") {
            accountApi.addAstrology(props.user._id, astrology[idx]).then(data => {
                if (data.data.success) {
                    setMsg("Astrology Sign added")
                }
            })
        }
        document.body.querySelector(`.addAstrologyBtns${idx}`).toggleAttribute("hidden")
        setTimeout(() => {
            setMsg("")
        }, 2000)
    }
    // this adds the family members name and sign to the users account to be accessed from the account info page
    const submitFamilyForm = (e, idx) => {
        e.preventDefault()
        let arr = props.user.familyAstrology
        arr.push({ name: familyName, sign: astrology[idx].sign })
        accountApi.updateFamilyAstrology(props.user._id, arr).then(data => {
            if (data.data.success) {
                document.querySelector(`.familyName${idx}`).value = ""
                document.body.querySelector(`.familyForm${idx}`).toggleAttribute("hidden")
                document.body.querySelector(`.pinBtn${idx}`).classList.remove('hide')
                setMsg("Family Astrology Sign added")
            }
        })
        setTimeout(() => {
            setMsg("")
        }, 2000)
    }
    // if you decide that you do not want to add a family members astrology sign you can hit the back button and it will get rid of the family form
    const backBtn = (idx) => {
        document.body.querySelector(`.familyForm${idx}`).toggleAttribute("hidden")
        document.body.querySelector(`.pinBtn${idx}`).classList.remove('hide')
    }
    return (
        <>
            <div className="text-center">
                <h1 className="allPageTitles">Astrology</h1>
                <h4 className="text-center mt-4 text-white container">Click on a date that falls on your birthday below to see/close the description for your Astrology sign. Click on the 📍 to add your or your families sign to your profile.</h4>
            </div>
            {astrology ? astrology.map((astro, idx) => {
                return <div key={idx} className="text-center mt-5 container">
                    <h1 className="mb-4 astroTitle" onClick={e => showAstro(idx)}>{astro.date} </h1>
                    <div className={`pin${idx} pin`} hidden><Button type="button" className={`pinBtn${idx} pinBtn`} onClick={e => showBtns(idx)}>📍</Button>
                        {props.status ? <div><div className={`addAstrologyBtns${idx} mt-2 mb-4 text-center`} hidden>
                            <h6 className="text-white mb-3">Add To:</h6>
                            <Button type="button" className="allBtn me-3" value="family" onClick={e => addingAstrology(e.target.value, idx)}>Family Tree</Button>
                            <Button type="button" className="allBtn ms-3" value="profile" onClick={e => addingAstrology(e.target.value, idx)}>My Profile</Button>
                        </div>
                            <div className={`familyForm${idx} familyNameForm  mb-4`} hidden>
                                <Form onSubmit={e => submitFamilyForm(e, idx)}>
                                    <Form.Group>
                                        <Form.Label className="text-white">Family Member's Name</Form.Label>
                                        <Form.Control type="name" placeholder="Enter Name" onChange={e => setFamilyName(e.target.value)} className={`familyName${idx}`} />
                                    </Form.Group>
                                    <div className="mt-3 d-flex justify-content-evenly">
                                        <Button type="submit" className="allBtn">Add Family</Button>
                                        <Button type="button" className="allBtn" onClick={e => backBtn(idx)}>Back</Button>
                                    </div>
                                </Form>
                            </div>
                        </div> : <p className='text-white'>Please Log in to add Astrology sign to profile</p>}
                        {msg ? <h6 className="text-white">{msg}</h6> : ""}
                    </div>
                    <h1 className={`signTitle title${idx} mb-4`} hidden>{astro.sign}</h1>
                    <h3 className={`astroTrait trait${idx}`} hidden>Most Likeable Trait: {astro.trait}</h3>
                    <div className={`text-center desc${idx}`} hidden>
                        <ShowAstroDesc desc={astro.desc} />
                        <h3 className="astroTrait">The Inner You</h3>
                        <p className="astroDescDiv">{astro.inner}</p>
                        <h3 className="astroTrait">How Others See You</h3>
                        <p className="astroDescDiv">{astro.others}</p>
                    </div>
                    <div className={`text-start ul${idx}`} hidden>
                        <ul className="astrologyUl">
                            <li><strong className="strongWord">Duality: </strong> {astro.duality}</li>
                            <li><strong className="strongWord">Triplicity: </strong> {astro.triplicity}</li>
                            <li><strong className="strongWord">Quadruplicity: </strong> {astro.quadruplicity[0]} <p className="m-0">{astro.quadruplicity[1]}</p></li>
                            <li><strong className="strongWord">Ruling Planet: </strong> {astro.ruling}</li>
                            <li><strong className="strongWord">Symbol: </strong> {astro.symbol}</li>
                            <li><strong className="strongWord">Glyph: </strong><img className="zodiacPic" src={astro.glyph[0]} alt="zodiac sign"/><p>{astro.glyph[1]}</p></li>
                            <li><strong className="strongWord">Dominate Keyword: </strong> {astro.dominant}</li>
                            <li><strong className="strongWord">Polarity: </strong> {astro.polarity}</li>
                            <li><strong className="strongWord">Lucky Day: </strong> {astro.day}</li>
                            <li><strong className="strongWord">Lucky Numbers: </strong> {astro.number}</li>
                            <li><strong className="strongWord">Magical Birthstone: </strong> {astro.birthstone}</li>
                            <li><strong className="strongWord">Special Colors: </strong> {astro.color}</li>
                            <li><strong className="strongWord">Cities: </strong> {astro.cities}</li>
                            <li><strong className="strongWord">Countries: </strong> {astro.countries}</li>
                            <li><strong className="strongWord">Flowers: </strong> {astro.flowers}</li>
                            <li><strong className="strongWord">Trees: </strong> {astro.trees}</li>
                            <li><strong className="strongWord">Metal: </strong> {astro.metal}</li>
                            <li><strong className="strongWord">Animals Ruled By {astro.sign}: </strong> {astro.animals}</li>
                            <li><strong className="strongWord">Danger: </strong> {astro.danger}</li>
                            <li><strong className="strongWord">Famous People With This Sign: </strong>{astro.famous}</li>
                        </ul>
                    </div>
                </div>
            }) : ""}
        </>
    )
}

export default Astrology