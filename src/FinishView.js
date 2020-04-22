import React from "react";
import { Header, Grid, Label, Table } from "semantic-ui-react";

const getColour = (i) => {
    const colours = ["teal", "pink", "yellow", "purple", "orange", "green"];
    return colours[i % colours.length];
};

const FinishView = ({ gameState }) => (
    <Grid columns={2}>
        <Grid.Row>
            <Grid.Column width={12}>
                <Grid
                    textAlign="center"
                    style={{ height: "100vh" }}
                    verticalAlign="middle"
                >
                    <Grid.Column>
                        <Header>The results are in...</Header>
                        <div className="finished-results">
                            <Table basic="very">
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
                        </div>
                    </Grid.Column>
                </Grid>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);
export default FinishView;
