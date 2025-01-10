import React from 'react'
import FamilyTableData from '../FamilyTableData'
import { Table } from 'react-bootstrap'
import accountApi from '../../Api/account-api'
// Family tree table that is called on both astrology and numerology on the account info page
const FamilyTreeTable = (props) => {
    // deletes a family member from the family tree table
    const deleteFamilyMember = (e, from) => {
        if (from === "numerology") {
            let value = e.getAttribute("value")
            let arr = props.user.familyNumerology
            arr.splice(value, 1)
            accountApi.updateFamilyNumerology(props.user._id, { info: arr }).then(data => {
                props.changeStatus(true, data.data)
            })
        } else {
            let value = e.getAttribute("value")
            let arr = props.user.familyAstrology
            arr.splice(value, 1)
            accountApi.updateFamilyAstrology(props.user._id, arr).then(data => {
                props.changeStatus(true, data.data)
            })
        }
    }
    return (
        <>
            {props.from === "numerology" ? <Table striped className="adjustFamilyTableRow">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Life</th>
                        <th>Soul</th>
                        <th>Outer</th>
                        <th>Destiny</th>
                        <th>Desc</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {props.user.familyNumerology ? props.user.familyNumerology.map((result, idx) => {
                        return <FamilyTableData key={idx} result={result.result} name={result.name} deleteFamily={deleteFamilyMember} value={idx}
                            showDesc={props.showDesc}
                            from="numerology"
                        />
                    }) : ""}
                </tbody>
            </Table> : <Table striped>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Sign</th>
                            <th>Desc</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.user.familyAstrology ? props.user.familyAstrology.map((result, idx) => {
                            return <FamilyTableData key={idx} sign={result.sign} name={result.name} deleteFamily={deleteFamilyMember} value={idx}
                                showDesc={props.showDesc}
                                from="astrology"
                            />
                        }) : ""}
                    </tbody>
                </Table>}
        </>
    )
}

export default FamilyTreeTable