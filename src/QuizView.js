import React from 'react'
import AnswerForm from './AnswerForm'
import QuestionForm from './QuestionForm'
import Players from './Players'

const QuizView = ({myName, gameState, onAnswerSubmitted, onQuestionSubmitted}) => {
    let body;
    if (gameState.question.text != "") {
        if (gameState.question.name == myName) {
            body = <p>Waiting for answers...</p>
        }
        else {
        body = 
                <AnswerForm gameState={gameState}
                            handleSubmit={onAnswerSubmitted}/>
        }
    }
    else {
        body =                   
                <QuestionForm handleSubmit={onQuestionSubmitted}/>
    }
    return (
        <div className="App">
            <header className="App-header">
                <h1>Quiz Party</h1>
            </header>
            <div>
                <Players players={gameState.players}/>
            </div>
            {body}
        </div>
    );
}

export default QuizView