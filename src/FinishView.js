import React from "react";
import Notification from "./Notification";
import { Header, Grid, Label, Table, Button, GridRow } from "semantic-ui-react";

const getColour = (i) => {
    const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
    return colours[i % colours.length];
};

const NewQuizLink = () => (
    <div className="new-quiz">
        <a href="/">
            <Button fluid size="medium" color="blue">
                Start a New Quiz
            </Button>
        </a>
    </div>
);

const FinishView = ({ gameState, socket }) => (
    <>
        <Notification socket={socket} gameState={gameState} />
        <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
        >
            <Grid.Row>
                <Grid.Column>
                    <Grid textAlign="center">
                        <GridRow>
                            <Header as="h1">The results are in!</Header>
                        </GridRow>
                        <GridRow>
                            <Table
                                textAlign="center"
                                basic="very"
                                syle={{ width: "50%" }}
                            >
                                <Table.Body>
                                    {gameState.players.map((player, i) => (
                                        <Table.Row key={player.name}>
                                            <Table.Cell>
                                                <Label
                                                    as="a"
                                                    color={getColour(i)}
                                                    size="huge"
                                                    style={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    {player.name}
                                                </Label>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Header size="huge">
                                                    {player.score}
                                                </Header>
                                            </Table.Cell>
                                        </Table.Row>
                                    ))}
                                </Table.Body>
                            </Table>
                        </GridRow>
                        <GridRow>
                            <NewQuizLink />
                        </GridRow>
                    </Grid>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </>
);
export default FinishView;
