import React, { useState } from "react";
import { Label, Table, Header, Form, Button, Confirm } from "semantic-ui-react";

const getColour = (player, players) => {
    const sortedPlayers = [...players].sort((a, b) =>
        a.name > b.name ? 1 : -1
    );
    const i = sortedPlayers.indexOf(player);
    const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
    return colours[i % colours.length];
};

const Players = ({ players, isMobile, showScores }) => {
    if (showScores) {
        players.sort((a, b) => (a.score <= b.score ? 1 : -1));
    }
    return (
        <div className={isMobile ? "players-mobile" : "players"}>
            <Header
                size={isMobile ? "medium" : "huge"}
                style={{ marginBottom: "0px" }}
            >
                Players
            </Header>
            <Table basic="very" style={{ maxWidth: "100px" }} unstackable>
                <Table.Body>
                    {players.map((player, i) => (
                        <Table.Row key={player.name}>
                            <Table.Cell
                                style={{
                                    textAlign: "center",
                                }}
                            >
                                <Label
                                    as="a"
                                    color={getColour(player, players)}
                                    size={isMobile ? "medium" : "big"}
                                    style={{
                                        textAlign: "center",
                                    }}
                                >
                                    {player.name}
                                </Label>
                            </Table.Cell>
                            {showScores && (
                                <Table.Cell>
                                    <Header size={isMobile ? "medium" : "huge"}>
                                        {player.score}
                                    </Header>
                                </Table.Cell>
                            )}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
};

export default Players;
