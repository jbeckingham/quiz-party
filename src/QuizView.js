import React from 'react'
import QuestionForm from './QuestionForm'
import AnswerForm from './AnswerForm'
import Players from './Players'
import { Header, Grid } from 'semantic-ui-react'

const AnswersPendingView = ({ gameState }) => {
    const playersAnswered = Object.keys(gameState.currentQuestion.answers)
    return (
        <div>
            <h1>Waiting for answers...</h1>
            <h2>Questions has been answered by:</h2>
            <h2>{playersAnswered.join(', ')}</h2>
        </div>
    )
}

const SubmitAnswerView = ({ gameState, onAnswerSubmitted }) => (
    <div>
        <Header as="h2">{gameState.currentQuestion.name} asked a question:</Header>
        <Header as="h1">{gameState.currentQuestion.text} </Header>
        <AnswerForm gameState={gameState} handleSubmit={onAnswerSubmitted} />
    </div>
)


const MainPanel = ({ gameState, myName, onAnswerSubmitted, onQuestionSubmitted }) => {
    if (!gameState.currentQuestion) {
        return <QuestionForm handleSubmit={onQuestionSubmitted} />
    }

    const answered = gameState.currentQuestion.answers[myName]
    const questionAskedByMe = gameState.currentQuestion.name === myName

    if (!answered && !questionAskedByMe) {
        return <SubmitAnswerView gameState={gameState} onAnswerSubmitted={onAnswerSubmitted} />

    }

    return <AnswersPendingView gameState={gameState} />
}

const QuizView = ({ gameState, myName, onAnswerSubmitted, onQuestionSubmitted }) => (
    <Grid columns={2}>
        <Grid.Row>
            <Grid.Column width={12}>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Column>
                        <MainPanel
                            gameState={gameState}
                            myName={myName}
                            onAnswerSubmitted={onAnswerSubmitted}
                            onQuestionSubmitted={onQuestionSubmitted} />
                    </Grid.Column>
                </Grid>
            </Grid.Column>
            <Grid.Column width={4}>
                <Players players={gameState.players} />
            </Grid.Column>
        </Grid.Row>
    </Grid>
)
export default QuizView