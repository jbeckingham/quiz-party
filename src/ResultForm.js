import React, { useState } from "react";
import { Form, Button, Header, Table, Label, Select } from "semantic-ui-react";

const getColour = (i) => {
    const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
    return colours[i % colours.length];
};

const resultOptions = [
    { key: "correct", value: 1, text: "Correct" },
    { key: "half", value: 0.5, text: "I'll give ya half" },
    { key: "incorrect", value: 0, text: "Incorrect" },
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

    const getPlayerColour = (name) => {
        let names = gameState.players.map((player) => player.name);
        let i = names.indexOf(name);
        return getColour(i);
    };

    const answers = Object.keys(gameState.currentQuestion.answers);
    const allAnswered = Object.keys(results).length == answers.length;

    return (
        <div>
            {answers.length ? (
                <Form onSubmit={onSubmit} style={{ margin: "auto" }}>
                    <Table basic="very">
                        <Table.Body>
                            {answers.map((name, i) => (
                                <Table.Row key={name}>
                                    <Table.Cell>
                                        <Label
                                            as="a"
                                            size="huge"
                                            color={getPlayerColour(name)}
                                            style={{ textAlign: "center" }}
                                        >
                                            {name}
                                        </Label>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header size="huge">
                                            {
                                                gameState.currentQuestion
                                                    .answers[name]
                                            }
                                        </Header>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Header>
                                            <Select
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
