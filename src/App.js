import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import JoinView from './JoinView'
import QuizView from './QuizView';
import { Grid, Header } from 'semantic-ui-react'

class App extends Component {

    constructor() {
        super();
        this.state = {
            myName: "",
            answered: false,
            joined: false,
            gameState: {
                players: [],
                question: {
                    text: "",
                    name: "",
                    answers: [ 
                        {
                            name: "Jen",
                            value: "Blue"
                        },
                        {
                            name: "Tigger",
                            value: "Orange"
                        }
                    ]
                }
            },
            response: 0,
            socket: socketIOClient("http://127.0.0.1:5000")
        }
    }

    componentDidMount() {
        this.state.socket.on("stateUpdated", gameState => {
            this.setState({ gameState: gameState })
        })
    }

    onNameSubmitted = (name) => {
        this.state.socket.emit("join", { name: name })
        this.setState({
            myName: name,
            joined: true
        })
    }

    onQuestionSubmitted = (question) => {
        console.log('q:', question)
        this.state.socket.emit("ask", { name: this.state.myName, text: question });
    }

    onAnswerSubmitted = (answer) => {
        this.setState({
            answered: true
        })
        this.state.socket.emit("answer", { name: this.state.myName, answer: answer })
    }

    render() {
        return (
            <div id='main'>
                <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                    <Grid.Row>
                        <Grid.Column>
                            <div>
                                {this.state.joined
                                    ? <QuizView gameState={this.state.gameState}
                                        myName={this.state.myName}
                                        answered = {this.state.answered}
                                        onAnswerSubmitted={this.onAnswerSubmitted}
                                        onQuestionSubmitted={this.onQuestionSubmitted} />
                                    : <JoinView gameState={this.state.gameState}
                                        onNameSubmitted={this.onNameSubmitted} />
                                }
                            </div>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
        )
    }
}

export default App;