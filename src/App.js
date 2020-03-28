import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import Players from './Players';
import QuestionForm from './QuestionForm';

class App extends Component {

    constructor() {
        super();
        this.state = {
            players: [{
                name: 'Jen',
                score: '10'
            },
            {
                name: 'James',
                score: '-4000'
            }],
            question: {
                text: '',
            },
            response: 0,
            endpoint: "http://127.0.0.1:5000"
        }
    }

    componentDidMount() {
        const {endpoint} = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("outgoing data", data => this.setState({response: data.num}));
    }

    render() {
        const {response} = this.state;

        return (
        <div className="App">
          <header className="App-header">
             <h1>Quiz Party</h1>
          </header>
          <div>
                <Players players={this.state.players}> </Players>
          </div>
          <div>
                <QuestionForm> </QuestionForm>
          </div>
        </div>
        );
    }
}

export default App;
