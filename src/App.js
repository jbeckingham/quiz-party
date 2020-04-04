import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import JoinView from './JoinView'
import QuizView from './QuizView';
import { Grid } from 'semantic-ui-react'

const socket = socketIOClient("http://127.0.0.1:5000")

class App extends Component {

    constructor() {
        super();
        this.state = {
            myName: "",
            joined: false,
            gameState: null
        }
    }

    componentDidMount() {
        socket.on("stateUpdated", gameState => {
            this.setState({ gameState: gameState })
        })
    }

    onNameSubmitted = (name) => {
        socket.emit("join", { name: name })
        this.setState({
            myName: name,
            joined: true
        })
    }

    onQuestionSubmitted = (question) => {
        socket.emit("ask", { name: this.state.myName, text: question });
    }

    onAnswerSubmitted = (answer) => {
        this.setState({
            answered: true
        })
        socket.emit("answer", { name: this.state.myName, answer: answer })
    }


    onResultsSubmitted = (markedAnswers) => {
        socket.emit("results", { results: markedAnswers})
    }

    render() {
        return (
            <div id='main'>
                {!this.state.gameState
                    ? <p>Unable to connect</p>
                    : (
                        <Grid
                            textAlign='center'
                            style={{ height: '100vh' }}
                            verticalAlign='middle'
                        >
                            <Grid.Row>
                                <Grid.Column>
                                    <div>
                                        {this.state.joined
                                            ? <QuizView
                                                gameState={this.state.gameState}
                                                myName={this.state.myName}
                                                onAnswerSubmitted={this.onAnswerSubmitted}
                                                onQuestionSubmitted={this.onQuestionSubmitted} 
                                                onResultsSubmitted={this.onResultsSubmitted}  />
                                            : <JoinView
                                                gameState={this.state.gameState}
                                                onNameSubmitted={this.onNameSubmitted} />
                                        }
                                    </div>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
                    )}
            </div>
        )
    }
}

export default App;