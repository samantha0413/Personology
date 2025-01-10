import React from 'react'
// quiz history table data..this component is called on GameHistoryTable component
const GameHistoryTD = props => {
    return (
        <tr>
            <td>{props.date}</td>
            {props.result.map((results, idx) => {
                return <td key={idx} className="border-top">{results.name}</td>
            })}
        </tr>
    )
}

export default GameHistoryTD