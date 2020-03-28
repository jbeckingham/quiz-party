import React from 'react'
import { List, Label, Table, Header } from 'semantic-ui-react'

const Players = ({players}) =>
    <div className="players">
        <h1>Scores</h1>
        <Table basic="very">
            <Table.Body>
                {players.map(name => (
                    <Table.Row>
                        <Table.Cell>
                            <Label as="a" color="teal" size="huge" style={{textAlign: "center"}}>{name}</Label>
                        </Table.Cell>
                        <Table.Cell>
                            <Header size="huge">{18}</Header>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>

export default Players;
