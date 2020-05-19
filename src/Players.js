import React from "react";
import { Label, Table, Header } from "semantic-ui-react";

const getColour = (i) => {
    const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
    return colours[i % colours.length];
};

const Players = ({ players, isMobile }) => (
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
                        <Table.Cell>
                            <Label
                                as="a"
                                color={getColour(i)}
                                size={isMobile ? "medium" : "huge"}
                                style={{ textAlign: "center" }}
                            >
                                {player.name}
                            </Label>
                        </Table.Cell>
                        <Table.Cell>
                            <Header size={isMobile ? "medium" : "huge"}>
                                {player.score}
                            </Header>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table>
    </div>
);

export default Players;
