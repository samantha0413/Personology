import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
// component called to the numerology page
const NumerologyForm = (props) => {
    // all the variables for the numerology numbers to be calculated
    const [birthdate, setBirthdate] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [middleName, setMiddleName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [letters] = useState({ a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9, j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9, s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8 })
    const [nums] = useState(Array(4).fill(null))
    // submits the form to run all the other functions to get the numerology numbers
    const getValues = (e) => {
        e.preventDefault()
        getBirthNumber()
        getNameNumber()
    }
    // reduces the birthdate to a single number needed for the first (life lesson) numerology number
    function getBirthNumber() {
        let lastNum = 0
        let splitBirth = birthdate.split('-')
        for (let i = 0; i < splitBirth[0].length; i++) {
            lastNum += Number(splitBirth[0][i])
        }
        let added = Number(splitBirth[1]) + Number(splitBirth[2]) + lastNum
        getNumbers(added, 0)
    }
    // adds up consonants and vowels in users name so that you can get a number to be reduced in a later function
    function getNameNumber() {
        // regex thats used to remove any character that is not a letter
        let re = /(\W)|(\d)/g
        let name = `${firstName} ${middleName} ${lastName}`
        let fixedName = name.replace(re, "")
        let vowel = 0
        let consonants = 0
        let vowels = /[aeiou]/g
        name = fixedName.toLowerCase()
        for (let i = 0; i < name.length; i++) {
            if (name[i] === "_") {
                name.replace(/\_/g, " ")
            } else if (name[i].match(vowels)) {
                vowel += letters[name[i]]
            } else if (name[i] !== " ") {
                consonants += letters[name[i]]
            }
        }
        getNumbers(vowel, 1)
        getNumbers(consonants, 2)
        getDestiny(nums[2], nums[1], 3)
    }
    // this reduces the consonants and vowels numbers to a single digit for the second (soul) and third (outer personality) numerology numbers
    function getNumbers(num, idx) {
        let stringNum = num.toString()
        let end = 0
        if (num === 11 || num === 22 || num === 33 || num === 44) {
            nums[idx] = num
        } else {
            for (let i = 0; i < stringNum.length; i++) {
                end += Number(stringNum[i])
            }
            end = end.toString()
            while (end.length > 1) {
                if (end === "11" || end === "22" || end === "33" || end === "44") {
                    nums[idx] = Number(end)
                    return
                } else {
                    end = Number(end[0]) + Number(end[1])
                    end = end.toString()
                }
            }
            nums[idx] = Number(end)
        }
    }
    // this adds the reduced numbers that are produced from the getNumbers function and then adds the numbers together and reduces them to get a single digit number for the fourth (destiny) and final number
    function getDestiny(outer, soul, idx) {
        let final = outer + soul
        while (final.toString().length !== 1) {
            final = final.toString()
            final = Number(final[0]) + Number(final[1])
        }
        nums[idx] = final
        props.changeFormComplete(true, nums, `${firstName} ${lastName}`)
    }
    return (
        <>
            <div className="numerologyForm text-center">
                <Form onSubmit={e => getValues(e)}>
                    <Form.Group>
                        <Form.Label className="container" >Birthday</Form.Label>
                        <Form.Control type="date" onChange={e => setBirthdate(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="container">First Name</Form.Label>
                        <Form.Control type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} required />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="container">Middle Name</Form.Label>
                        <Form.Control type="text" placeholder="Middle Name" onChange={e => setMiddleName(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="container">Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} required />
                    </Form.Group>
                    <Button className="allBtn" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        </>
    )
}

export default NumerologyForm