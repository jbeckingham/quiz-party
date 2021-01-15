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

const RemovePlayer = ({ gameState, onRemovePlayer, myName }) => {
    const onSubmit = (event) => {
        event.preventDefault();
        onRemovePlayer(event.target.id);
    };
    return (
        <>
            <Header>Remove a player from the game:</Header>
            <Table
                basic="very"
                style={{ maxWidth: "100px", marginLeft: "25px" }}
                unstackable
            >
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
                                    <Button
                                        disabled={player.name == myName}
                                        id={player.name}
                                        onClick={onSubmit}
                                        size="medium"
                                        color="orange"
                                    >
                                        Remove
                                    </Button>
                                </Form.Field>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    );
};

export default RemovePlayer;
