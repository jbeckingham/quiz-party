import React from 'react'
import { Label, Table, Header } from 'semantic-ui-react'

const getColour = i => {
    const colours = ['teal', 'pink', 'yellow', 'purple', 'orange', 'green']
    return colours[i % colours.length]
}

const Players = ({players}) =>
    <div className="players">
        <h1>Scores</h1>
        <Table basic="very">
            <Table.Body>
                {players.map((name, i) => (
                    <Table.Row key={name}>
                        <Table.Cell>
                            <Label as="a" color={getColour(i)} size="huge" style={{textAlign: "center"}}>{name}</Label>
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
