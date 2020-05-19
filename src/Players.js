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

const ShowScoresButton = ({ showScores, onShowScores }) => {
    const [open, setOpen] = useState(false);

    const show = () => setOpen(true);
    const cancel = () => setOpen(false);

    const onSubmit = (event) => {
        event.preventDefault();
        setOpen(false);
        onShowScores();
    };
    return (
        <div className="showScores">
            <Form size="massive" style={{ margin: "auto" }}>
                <Button size="medium" color="purple" onClick={show}>
                    {showScores ? "Hide Scores" : "Show Scores"}
                </Button>
                <Confirm
                    open={open}
                    cancelButton="Never mind"
                    confirmButton="Yes I'm sure"
                    content={
                        showScores
                            ? "Are you sure you want to hide the scores?"
                            : "Are you sure you want to show the scores?"
                    }
                    onCancel={cancel}
                    onConfirm={onSubmit}
                />
            </Form>
        </div>
    );
};

const Players = ({ players, showScores, isMobile, onShowScores }) => (
    <div className={isMobile ? "players-mobile" : "players"}>
        <Header
            size={isMobile ? "medium" : "huge"}
            style={{ marginBottom: "0px" }}
        >
            Players
        </Header>
        <Table basic="very" style={{ maxWidth: "100px" }} unstackable>
            <Table.Body>
                {players
                    .sort((a, b) => (a.score < b.score ? 1 : -1))
                    .map((player, i) => (
                        <Table.Row key={player.name}>
                            <Table.Cell>
                                <Label
                                    as="a"
                                    color={getColour(player, players)}
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
