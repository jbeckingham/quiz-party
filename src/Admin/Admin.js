import React, { useEffect, useState } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Grid, Button, Header } from "semantic-ui-react";
import AdjustScores from "./AdjustScores";
import ShowScores from "./ShowScores";

const ReturnToQuiz = ({ id }) => {
    const link = "/quiz/" + id;
    return (
        <div className="return-to-quiz">
            <a href={link}>
                <Button size="big" color="blue">
                    Return to Quiz
                </Button>
            </a>
        </div>
    );
};

const Admin = ({ gameState, socket, myName }) => {
    const onAdjustScoresSubmitted = (scores) => {
        socket.emit("adjustScores", {
            id: gameState.id,
            scores: scores,
            admin: myName,
        });
    };

    const onShowScoresSubmitted = (scores) => {
        socket.emit("showScores", {
            id: gameState.id,
            admin: myName,
        });
    };

    return (
        <>
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column>
                        <Header as="h2">
                            Admin Panel for {gameState.name}
                        </Header>
                        <p>
                            Please only use the below actions if absolutely
                            necessary. The other players in the game will be
                            notified by any actions you take.
                        </p>
                        <ReturnToQuiz id={gameState.id} />
                        <ShowScores
                            gameState={gameState}
                            onShowScoresSubmitted={onShowScoresSubmitted}
                        />
                        <AdjustScores
                            gameState={gameState}
                            onAdjustScoresSubmitted={onAdjustScoresSubmitted}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};

export default Admin;
