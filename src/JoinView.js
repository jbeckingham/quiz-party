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
            <Header as="h1">Join the party!</Header>
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
            <NameForm handleSubmit={onNameSubmitted} />
        </GridRow>
    </Grid>
);

export default JoinView;
