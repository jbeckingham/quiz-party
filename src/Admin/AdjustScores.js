import React, { useState } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Modal, Button, Table, Form, Label, Input } from "semantic-ui-react";

const getColour = (player, players) => {
    const sortedPlayers = [...players].sort((a, b) =>
        a.name > b.name ? 1 : -1
    );
    const i = sortedPlayers.indexOf(player);
    const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
    return colours[i % colours.length];
};

const AdjustScores = ({ gameState, onAdjustScoresSubmitted }) => {
    const [adjustments, setAdjustments] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = () => setModalOpen(true);

    const handleClose = () => setModalOpen(false);

    const onChange = (value, name) => {
        setAdjustments({ ...adjustments, [name]: value });
    };
    const onSubmit = (event) => {
        event.preventDefault();
        onAdjustScoresSubmitted(adjustments);
        handleClose();
    };
    return (
        <Modal
            trigger={
                <Button onClick={handleOpen} size="medium" color="red">
                    Adjust Scores
                </Button>
            }
            open={modalOpen}
            onClose={handleClose}
        >
            <Modal.Header>Adjust a player's score below</Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Form onSubmit={onSubmit}>
                        <Table
                            basic="very"
                            style={{ maxWidth: "100px" }}
                            unstackable
                        >
                            <Table.Body>
                                {gameState.players
                                    .sort((a, b) =>
                                        a.score <= b.score ? 1 : -1
                                    )
                                    .map((player, i) => (
                                        <Table.Row key={player.name}>
                                            <Table.Cell>
                                                <Label
                                                    as="a"
                                                    size="large"
                                                    color={getColour(
                                                        player,
                                                        gameState.players
                                                    )}
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
                                                        placeholder={
                                                            player.score
                                                        }
                                                        size="large"
                                                        onChange={(
                                                            event,
                                                            data
                                                        ) =>
                                                            onChange(
                                                                data.value,
                                                                player.name
                                                            )
                                                        }
                                                        type="number"
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
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default AdjustScores;
