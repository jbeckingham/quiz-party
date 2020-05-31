import React, { useState } from "react";
import "../App.css";
import "semantic-ui-css/semantic.min.css";
import { Button, Table, Form, Label, Input, Header } from "semantic-ui-react";

const ShowScores = ({ gameState, onShowScoresSubmitted }) => {
    const onSubmit = (event) => {
        event.preventDefault();
        onShowScoresSubmitted();
    };
    return (
        <Form onSubmit={onSubmit} className="show-scores">
            <Button type="submit" size="big" color="pink">
                Show Scores
            </Button>
        </Form>
    );
};

export default ShowScores;
