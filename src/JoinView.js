import React from "react";
import { Grid, GridRow, Header, Label } from "semantic-ui-react";
import NameForm from "./NameForm";

const getColour = (i) => {
    const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
    return colours[i % colours.length];
};

const JoinView = ({ onNameSubmitted, gameState }) => (
    <Grid textAlign="center">
        <GridRow>
            <Header className="join-header" as="h1">
                Enter your name to join {gameState.name}!
            </Header>
        </GridRow>
        <GridRow>
            {gameState.players.map((player, i) => (
                <Label
                    key={player.name}
                    color={getColour(i)}
                    size="huge"
                    style={{ textAlign: "center" }}
                >
                    {player.name}
                </Label>
            ))}
        </GridRow>
        <GridRow>
            <NameForm gameState={gameState} handleSubmit={onNameSubmitted} />
        </GridRow>
    </Grid>
);

export default JoinView;
