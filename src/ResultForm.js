import React, { useState } from "react";
import { Form, Button, Header, Table, Label, Select } from "semantic-ui-react";

// const getColour = (i) => {
//     const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
//     return colours[i % colours.length];
// };

const resultOptions = [
    { key: "0", value: 0, text: "0" },
    { key: "0.5", value: 0.5, text: "0.5" },
    { key: "1", value: 1, text: "1" },
    { key: "1.5", value: 1.5, text: "1.5" },
    { key: "2", value: 2, text: "2" },
];

const ResultForm = ({ gameState, handleSubmit }) => {
    const [results, setResults] = useState({});

    const onChange = (value, name) => {
        setResults({ ...results, [name]: value });
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(results);
    };

    const getColour = (player, players) => {
        const sortedPlayers = [...players].sort();
        const i = sortedPlayers.indexOf(player);
        const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
        return colours[i % colours.length];
    };

    const answers = Object.keys(gameState.currentQuestion.answers);
    const allAnswered = Object.keys(results).length == answers.length;

    return (
        <div>
            {answers.length ? (
                <Form onSubmit={onSubmit} style={{ margin: "auto" }}>
                    <Table className="results-table" basic="very" unstackable>
                        <Table.Body>
                            {answers.map((name, i) => (
                                <Table.Row key={name}>
                                    <Table.Cell>
                                        <Label
                                            as="a"
                                            size="huge"
                                            color={getColour(
                                                name,
                                                gameState.players.map(
                                                    (player) => player.name
                                                )
                                            )}
                                            style={{ textAlign: "center" }}
                                        >
                                            {name}
                                        </Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header size="medium">
                                            {
                                                gameState.currentQuestion
                                                    .answers[name]
                                            }
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header>
                                            <Select
                                                style={{ minWidth: "50px" }}
                                                onChange={(event, data) =>
                                                    onChange(data.value, name)
                                                }
                                                placeholder="Select..."
                                                options={resultOptions}
                                            />
                                        </Header>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                    <Button
                        type="submit"
                        size="huge"
                        primary
                        disabled={!allAnswered}
                    >
                        Submit Results
                    </Button>
                </Form>
            ) : (
                <div>
                    <h2>Looks like no one answered your question.</h2>
                    <Form
                        onSubmit={onSubmit}
                        style={{ width: "50%", margin: "auto" }}
                    >
                        <Button type="submit" size="huge" primary>
                            Start again
                        </Button>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default ResultForm;
