import React, { useState } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Table, Form, Label, Input, Header } from "semantic-ui-react";

const getColour = (player, players) => {
    const sortedPlayers = [...players].sort((a, b) =>
        a.name > b.name ? 1 : -1
    );
    const i = sortedPlayers.indexOf(player);
    const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
    return colours[i % colours.length];
};

const AdjustScores = ({ gameState, onAdjustScoresSubmitted }) => {
    const initialScores = gameState.players.reduce(
        (output, player) => ({
            ...output,
            [player.name]: player.score,
        }),
        {}
    );
    const [playerScores, setPlayerScores] = useState(initialScores);

    const onChange = (value, name) => {
        setPlayerScores({ ...playerScores, [name]: value });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        onAdjustScoresSubmitted(playerScores);
    };
    return (
        <Form onSubmit={onSubmit} className="adjust-scores">
            <Header>Adjust player scores:</Header>
            <Table basic="very" style={{ maxWidth: "100px" }} unstackable>
                <Table.Body>
                    {gameState.players.map((player, i) => (
                        <Table.Row key={player.name}>
                            <Table.Cell>
                                <Label
                                    as="a"
                                    size="large"
                                    color={getColour(player, gameState.players)}
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    {player.name}
                                </Label>
                            </Table.Cell>
                            <Table.Cell>
                                <Form.Field>
                                    <Input
                                        value={playerScores[player.name]}
                                        size="large"
                                        onChange={(event, data) =>
                                            onChange(data.value, player.name, i)
                                        }
                                        type="number"
                                        step={0.5}
                                    />
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Button type="submit" size="huge" primary color="blue">
                Update Scores
            </Button>
        </Form>
    );
};

export default AdjustScores;
