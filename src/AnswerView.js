import React from 'react'
import AnswerForm from './AnswerForm'
import { List, Label, Table, Header } from 'semantic-ui-react'

const AnswerView = ({gameState}) => {
    return (
        <div id="answers">
            <Answers answers={gameState.question.answers} />
        </div>
    )
}

function Answers({answers}) {
    if (answers) {
        return (
            <Table basic="very">
                <Table.Body>
                    {answers.map(answer => (
                        <Table.Row>
                            <Table.Cell>
                                <Label>{answer.name}</Label>
                            </Table.Cell>
                            <Table.Cell>
                                <Header>{answer.value}</Header>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        )
    }
}

export default AnswerView