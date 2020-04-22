import React from "react";
import { Grid, GridRow, Form, Button } from "semantic-ui-react";
import LeaveForm from "./LeaveForm";
import QuizLink from "./QuizLink";
import FinishQuiz from "./FinishQuiz";

const NewQuizLink = () => (
    <div className="new-quiz">
        <a href="/">
            <Button fluid size="medium" color="blue">
                Start a New Quiz
            </Button>
        </a>
    </div>
);

const LeftPanel = ({ onLeaveSubmitted, onFinishSubmitted }) => {
    return (
        <div className="left-panel">
            <Grid>
                <GridRow>
                    <NewQuizLink />
                </GridRow>
                <GridRow>
                    <FinishQuiz handleSubmit={onFinishSubmitted} />
                </GridRow>
                <GridRow>
                    <QuizLink />
                </GridRow>
                <GridRow>
                    <LeaveForm handleSubmit={onLeaveSubmitted} />
                </GridRow>
            </Grid>
        </div>
    );
};

export default LeftPanel;
