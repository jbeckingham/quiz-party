import React from "react";
import QuestionForm from "./QuestionForm";
import AnswerForm from "./AnswerForm";
import Players from "./Players";
import ResultForm from "./ResultForm";
import LeaveForm from "./LeaveForm";
import MarkNow from "./MarkNow";
import { Header, Grid, Label, Table } from "semantic-ui-react";

const AnswersPendingView = ({ gameState, onMarkNow, myName }) => {
    const playersAnswered = Object.keys(gameState.currentQuestion.answers);
    const questionAskedByMe = gameState.currentQuestion.name === myName;
    return (
        <div>
            <h1>Waiting for answers to "{gameState.currentQuestion.text}"</h1>
            <h2>Question has been answered by:</h2>
            {playersAnswered.length ? (
                <h2>{playersAnswered.join(", ")}</h2>
            ) : (
                <h2>No one yet</h2>
            )}
            {questionAskedByMe && <MarkNow handleSubmit={onMarkNow} />}
        </div>
    );
};

const SubmitAnswerView = ({ gameState, onAnswerSubmitted }) => (
    <div>
        <Header as="h2">
            {gameState.currentQuestion.name} asked a question:
        </Header>
        <Header as="h1">{gameState.currentQuestion.text} </Header>
        <AnswerForm gameState={gameState} handleSubmit={onAnswerSubmitted} />
    </div>
);

const AnswersMarkingView = ({ gameState, onResultsSubmitted }) => (
    <div>
        <Header as="h2">
            Mark the answers to "{gameState.currentQuestion.text}"
        </Header>
        <ResultForm gameState={gameState} handleSubmit={onResultsSubmitted} />
    </div>
);

const MainPanel = ({
    gameState,
    myName,
    onAnswerSubmitted,
    onQuestionSubmitted,
    onResultsSubmitted,
    onMarkNow,
}) => {
    if (!gameState.currentQuestion) {
        return (
            <QuestionForm
                gameState={gameState}
                handleSubmit={onQuestionSubmitted}
            />
        );
    }

    const answered = gameState.currentQuestion.answers[myName];
    const questionAskedByMe = gameState.currentQuestion.name === myName;
    const readyToMark =
        gameState.players.length - 1 ===
            Object.keys(gameState.currentQuestion.answers).length ||
        gameState.currentQuestion.forceMark;

    if (!answered && !questionAskedByMe && !readyToMark) {
        return (
            <SubmitAnswerView
                gameState={gameState}
                onAnswerSubmitted={onAnswerSubmitted}
            />
        );
    } else if (readyToMark && !questionAskedByMe) {
        return <h3>{gameState.currentQuestion.name} is marking the results</h3>;
    } else if (readyToMark && questionAskedByMe) {
        return (
            <AnswersMarkingView
                gameState={gameState}
                onResultsSubmitted={onResultsSubmitted}
            />
        );
    }

    return (
        <AnswersPendingView
            gameState={gameState}
            onMarkNow={onMarkNow}
            myName={myName}
        />
    );
};

const QuizView = ({
    gameState,
    myName,
    onAnswerSubmitted,
    onQuestionSubmitted,
    onResultsSubmitted,
    onMarkNow,
}) => (
    <Grid columns={2}>
        <Grid.Row>
            <Grid.Column width={12}>
                <Grid
                    textAlign="center"
                    style={{ height: "100vh" }}
                    verticalAlign="middle"
                >
                    <Grid.Column>
                        <MainPanel
                            gameState={gameState}
                            myName={myName}
                            onAnswerSubmitted={onAnswerSubmitted}
                            onQuestionSubmitted={onQuestionSubmitted}
                            onResultsSubmitted={onResultsSubmitted}
                            onMarkNow={onMarkNow}
                        />
                    </Grid.Column>
                </Grid>
            </Grid.Column>
            <Grid.Column width={4}>
                <Players players={gameState.players} />
            </Grid.Column>
        </Grid.Row>
    </Grid>
);
export default QuizView;
