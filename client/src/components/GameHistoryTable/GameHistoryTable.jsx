import React from 'react'
import { Table } from 'react-bootstrap'
import GameHistoryTD from '../GameHistoryTD'
// quiz history table that displays all the quizzes the user has taken..this component is called on the QuizHistory component
const GameHistoryTable = props => {
    return (
        <>
            <Table striped size="sm" className="adjustTableRow">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {props.history.map((hist, idx) => {
                        return <GameHistoryTD
                            key={idx}
                            date={hist.date}
                            result={hist.result}
                        />
                    })}
                </tbody>
            </Table>
        </>
    )
}

export default GameHistoryTable