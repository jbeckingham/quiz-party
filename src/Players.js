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
                {players.map((player, i) => (
                    <Table.Row key={player.name}>
                        <Table.Cell>
                            <Label as="a" color={getColour(i)} size="huge" style={{textAlign: "center"}}>{player.name}</Label>
                        </Table.Cell>
                        <Table.Cell>
                            <Header size="huge">{player.score}</Header>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>

export default Players;
