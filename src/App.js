import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import Players from './Players';
import QuestionForm from './QuestionForm';
import NameForm from './NameForm';
import AnswerForm from './AnswerForm';

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

    setGameState(serverState) {
        this.setState(state => ({
            gameState: serverState
        }));
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
        const {response} = this.state;
        if (this.state.gameState){
            if (!this.state.joined) {
                return <NameForm handleSubmit={this.onNameSubmitted}/>
            }
            else {
                let body;
                if (this.state.gameState.question.text != "") {
                    if (this.state.gameState.question.name == this.state.myName) {
                        body = <p>Waiting for answers...</p>
                    }
                    else {
                    body = 
                        <div>
                            <p>{this.state.gameState.question.name} asked a question:</p>
                            <p>{this.state.gameState.question.text}</p>
                            <p>Your Answer:</p>
                            <AnswerForm handleSubmit={this.onAnswerSubmitted}/>
                        </div>
                    }
                }
                else {
                    body =                   
                        <div>
                            <QuestionForm handleSubmit={this.onQuestionSubmitted}/>
                        </div>
                }
                return (
                    <div className="App">
                        <header className="App-header">
                            <h1>Quiz Party</h1>
                        </header>
                        <div>
                            <Players players={this.state.gameState.players}/>
                        </div>
                        {body}
                    </div>
                );
            }
        }
    }
}

export default App;
