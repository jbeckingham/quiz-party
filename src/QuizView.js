import React from 'react'
import AnswerForm from './AnswerForm'
import QuestionForm from './QuestionForm'
import Players from './Players'
import { Grid, Header } from 'semantic-ui-react'

const QuizView = ({ myName, gameState, onAnswerSubmitted, onQuestionSubmitted }) => {
    let body;
    if (gameState.question.text != "") {
        if (gameState.question.name == myName) {
            body = <Header as='h1'>Waiting for answers...</Header>
        }
        else {
            body =
                <AnswerForm gameState={gameState}
                    handleSubmit={onAnswerSubmitted} />
        }
    }
    else {
        body =
            <QuestionForm handleSubmit={onQuestionSubmitted} />
    }
    return (
        <Grid columns={2}>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <Grid.Column>{body}</Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Players players={gameState.players} />
                </Grid.Column>
            </Grid.Row>
        </Grid>

    );
}

export default QuizView