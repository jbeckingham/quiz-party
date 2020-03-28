import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import JoinView from './JoinView'
import QuizView from './QuizView';

class App extends Component {

    constructor() {
        super();
        this.state = {
            myName: "",
            joined: false,
            gameState: {
                players: [],
                question: {
                    text: "",
                    name: "",
                    answers: {}
                }
            },
            response: 0,
            socket: socketIOClient("http://127.0.0.1:5000")
        }

        this.onNameSubmitted =  this.onNameSubmitted.bind(this)
        this.onQuestionSubmitted =  this.onQuestionSubmitted.bind(this)
        this.onAnswerSubmitted =  this.onQuestionSubmitted.bind(this)
    }

    componentDidMount() {
        this.state.socket.on("stateUpdated", gameState => {
            this.setState({gameState: gameState})
        })
    }

    onNameSubmitted(name) {
        this.state.socket.emit("join", {name: name})
        this.setState({
            myName: name,
            joined: true
        })
    }

    onQuestionSubmitted(question) {
        this.state.socket.emit("ask", {name: this.state.myName, text: question});
    }

    onAnswerSubmitted(answer) {
        this.state.socket.emit("answer", {name: this.state.myName, answer: answer})
    }

    render() {
        return this.state.joined
            ? <QuizView gameState={this.state.gameState}
                        myName={this.state.myName}
                        onAnswerSubmitted={this.onAnswerSubmitted}
                        onQuestionSubmitted={this.onQuestionSubmitted}/>
            : <JoinView onNameSubmitted={this.onNameSubmitted}/>
    }
}

export default App;
