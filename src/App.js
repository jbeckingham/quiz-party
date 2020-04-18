import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import JoinView from "./JoinView";
import QuizView from "./QuizView";
import { Grid } from "semantic-ui-react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

const socket = socketIOClient("http://127.0.0.1:5000");

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            myName: "",
            joined: false,
            gameState: null,
        };
    }

    componentDidMount() {
        const myName = this.getCookieName();
        this.setState({
            myName: myName,
            joined: myName ? true : false,
        });
        socket.on("stateUpdated", (gameState) => {
            gameState.players.sort((a, b) => (a.name > b.name ? 1 : -1));
            this.setState({ gameState: gameState });
        });
    }

    onNameSubmitted = (name) => {
        const { cookies } = this.props;
        socket.emit("join", { name: name });
        this.setState({
            myName: name,
            joined: true,
        });
        cookies.set("quizParty", { name: name, quizId: 1 });
    };

    onQuestionSubmitted = (question) => {
        socket.emit("ask", { name: this.state.myName, text: question });
    };

    onAnswerSubmitted = (answer) => {
        this.setState({
            answered: true,
        });
        socket.emit("answer", { name: this.state.myName, answer: answer });
    };

    onResultsSubmitted = (markedAnswers) => {
        socket.emit("results", { results: markedAnswers });
    };

    getCookieName = () => {
        const { cookies } = this.props;
        return cookies.get("quizParty") && cookies.get("quizParty").quizId == 1
            ? cookies.get("quizParty").name
            : "";
    };

    render() {
        return (
            <div id="main">
                {!this.state.gameState ? (
                    <p>Unable to connect</p>
                ) : (
                    <Grid
                        textAlign="center"
                        style={{ height: "100vh" }}
                        verticalAlign="middle"
                    >
                        <Grid.Row>
                            <Grid.Column>
                                <div>
                                    {this.state.joined ? (
                                        <QuizView
                                            gameState={this.state.gameState}
                                            myName={this.state.myName}
                                            onAnswerSubmitted={
                                                this.onAnswerSubmitted
                                            }
                                            onQuestionSubmitted={
                                                this.onQuestionSubmitted
                                            }
                                            onResultsSubmitted={
                                                this.onResultsSubmitted
                                            }
                                        />
                                    ) : (
                                        <JoinView
                                            gameState={this.state.gameState}
                                            onNameSubmitted={
                                                this.onNameSubmitted
                                            }
                                        />
                                    )}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                )}
            </div>
        );
    }
}

export default withCookies(App);
