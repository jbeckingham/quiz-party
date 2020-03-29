import React from 'react'
import AnswerView from './AnswerView'
import QuestionForm from './QuestionForm'
import Players from './Players'
import { Grid, Header } from 'semantic-ui-react'
import AnswerForm from './AnswerForm'

const QuizView = ({gameState, answered, onAnswerSubmitted, onQuestionSubmitted}) => {
    let body;
    let question;
    let answerForm;
    if (gameState.question.text != "") {
        question = <div>
                        <p>{gameState.question.name} asked a question:</p>
                        <p>{gameState.question.text}</p>
                    </div>
        body = <AnswerView gameState={gameState}></AnswerView>
        if (!answered) {
            answerForm =
                <AnswerForm gameState={gameState}
                    handleSubmit={onAnswerSubmitted} />
        }
    }
    else {
        body =
            <QuestionForm handleSubmit={onQuestionSubmitted} />
    }
    return (
        <div>
            {question}
            {answerForm}
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
        </div>
    );
}

export default QuizView