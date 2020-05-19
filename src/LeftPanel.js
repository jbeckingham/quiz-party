import React from "react";
import { Grid, GridRow, Form, Button } from "semantic-ui-react";
import LeaveForm from "./LeaveForm";
import QuizLink from "./QuizLink";
import FinishQuiz from "./FinishQuiz";

const NewQuizLink = ({ isMobile }) => (
    <div className="new-quiz">
        <a href="/">
            <Button fluid size="medium" color="blue">
                {!isMobile ? "Start a New Quiz" : "New"}
            </Button>
        </a>
    </div>
);

const LeftPanel = ({ onLeaveSubmitted, onFinishSubmitted, isMobile }) => {
    return (
        <>
            {!isMobile ? (
                <div className="left-panel">
                    <Grid>
                        <GridRow>
                            <NewQuizLink isMobile={isMobile} />
                        </GridRow>
                        <GridRow>
                            <FinishQuiz
                                handleSubmit={onFinishSubmitted}
                                isMobile={isMobile}
                            />
                        </GridRow>
                        <GridRow>
                            <QuizLink isMobile={isMobile} />
                        </GridRow>
                        <GridRow>
                            <LeaveForm
                                handleSubmit={onLeaveSubmitted}
                                isMobile={isMobile}
                            />
                        </GridRow>
                    </Grid>
                </div>
            ) : (
                <div className="left-panel-mobile">
                    <Grid>
                        <Grid.Column width={4}>
                            <NewQuizLink isMobile={isMobile} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <FinishQuiz
                                handleSubmit={onFinishSubmitted}
                                isMobile={isMobile}
                            />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <QuizLink isMobile={isMobile} />
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <LeaveForm
                                handleSubmit={onLeaveSubmitted}
                                isMobile={isMobile}
                            />
                        </Grid.Column>
                    </Grid>
                </div>
            )}
        </>
    );
};

export default LeftPanel;
