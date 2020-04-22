import React from "react";
import { Label, Table, Header } from "semantic-ui-react";

const AnswerView = ({ gameState }) => {
    return (
        <div id="answers">
            <Answers answers={gameState.currentQuestion.answers} />
        </div>
    );
};

const Answers = ({ answers }) => {
    if (answers) {
        return (
            <Table basic="very">
                <Table.Body>
                    {Object.entries(answers).map(([name, answer]) => (
                        <Table.Row>
                            <Table.Cell>
                                <Label>{name}</Label>
                            </Table.Cell>
                            <Table.Cell>
                                <Header>{answer}</Header>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        );
    }
};

export default AnswerView;
