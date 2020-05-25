import React, { useEffect, useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Grid, Button } from "semantic-ui-react";

const ReturnToQuiz = ({ id }) => {
    const link = "/quiz/" + id;
    return (
        <div className="return-to-quiz">
            <a href={link}>
                <Button size="medium" color="blue">
                    Return to Quiz
                </Button>
            </a>
        </div>
    );
};

const Admin = ({ gameState }) => {
    console.log(gameState);

    return (
        <>
            <Grid textAlign="center" verticalAlign="middle">
                <Grid.Row>
                    <Grid.Column>
                        <h1>Admin Panel!</h1>
                        <ReturnToQuiz id={gameState.id} />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </>
    );
};

export default Admin;
