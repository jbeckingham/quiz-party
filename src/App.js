import React, { Component } from 'react';
import socketIOClient from "socket.io-client";
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Players from './Players';
import QuestionForm from './QuestionForm';
import NameForm from './NameForm';
import { Grid, GridColumn } from 'semantic-ui-react'


class App extends Component {

    constructor() {
        super();
        this.state = {
            myName: "",
            joined: false,
            question: {
                text: '',
            },
            gameState: {
                players: []
            },
            response: 0,
            socket: socketIOClient("http://127.0.0.1:5000")
        }

        this.onNameSubmitted =  this.onNameSubmitted.bind(this)
    }

    componentDidMount() {
        this.state.socket.on("stateUpdated", gameState => {
            console.log('state updated:', gameState)
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

    render() {
        const {response} = this.state;

        if (!this.state.joined) {
            return <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                        <GridColumn>
                            <NameForm handleSubmit={this.onNameSubmitted}/>
                        </GridColumn>
                    </Grid>
        }
        else {
            return (
                <div className="App">
                  <header className="App-header">
                     <h1>Quiz Party</h1>
                  </header>
                  <div>
                        <Players players={this.state.gameState.players}/>
                  </div>
                </div>
            );
        }
    }
}

export default App;
