import React from 'react'
// family tree table data..this component is called on the FamilyTreeTable component
const FamilyTableData = (props) => {
    return (
        <>
        {props.from === "numerology" ?         <tr>
                <td>{props.name}</td>
                {props.result.map((results, idx) => {
                    return <td key={idx}>{results.number}</td>
                })}
                <td value={props.value} onClick={e=>props.showDesc(e.target)}>📘</td>
                <td onClick={e => props.deleteFamily(e.target, "numerology")} value={props.value}>❌</td>
            </tr> : <tr>
                <td>{props.name}</td>
                <td>{props.sign}</td>
                <td value={props.value} onClick={e=>props.showDesc(e.target)}>📘</td>
                <td onClick={e => props.deleteFamily(e.target, "astrology")} value={props.value}>❌</td>
            </tr>}
        </>
    )
}

export default FamilyTableData