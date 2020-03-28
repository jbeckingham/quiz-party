import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import Players from './Players';
import QuestionForm from './QuestionForm';
import NameForm from './NameForm';

class App extends Component {

    constructor() {
        super();
        this.state = {
            myName: "",
            question: {
                text: '',
            },
            gameState: {},
            response: 0,
            socket: socketIOClient("http://127.0.0.1:5000")
        }
    }

    componentDidMount() {
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        this.state.socket.on("stateUpdated", data => this.setState({gameState: data}) );
    }

    setGameState(serverState) {
        this.setState(state => ({
            gameState: serverState
        }));
    }

    render() {
        const {response} = this.state;

        if (this.state.myName == "") {
            return <NameForm socket={this.state.socket}></NameForm>
        }
        else {
            return (
                <div className="App">
                  <header className="App-header">
                     <h1>Quiz Party</h1>
                  </header>
                  <div>
                        <Players players={this.state.gameState.players}> </Players>
                  </div>
                </div>
            );
        }
    }
}

export default App;
