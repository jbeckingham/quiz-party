import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import JoinView from "./JoinView";
import QuizView from "./QuizView";
import FinishView from "./FinishView";
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
        let id = props.match.params.id;
        this.state = {
            myName: "",
            joined: false,
            gameState: { players: [], active: true },
            id: id,
        };
        socket.emit("getState", { id: this.state.id });
    }

    componentDidMount() {
        socket.on("stateUpdated", (gameState) => {
            if (!gameState) {
                window.location.replace("/");
            } else {
                if (gameState.id == this.state.id) {
                    gameState.players.sort((a, b) =>
                        a.name > b.name ? 1 : -1
                    );
                    this.setState({ gameState: gameState });
                    let myName = this.getName(gameState);
                    this.setState({
                        myName: myName,
                        joined: myName ? true : false,
                    });
                }
            }
        });
    }

    onNameSubmitted = (name) => {
        const { cookies } = this.props;
        socket.emit("join", { id: this.state.id, name: name });
        this.setState({
            myName: name,
            joined: true,
        });
        cookies.set("quizParty", { name: name, quizId: this.state.id });
    };

    onQuestionSubmitted = (question) => {
        socket.emit("ask", {
            id: this.state.id,
            name: this.state.myName,
            text: question,
        });
    };

    onAnswerSubmitted = (answer) => {
        this.setState({
            answered: true,
        });
        socket.emit("answer", {
            id: this.state.id,
            name: this.state.myName,
            answer: answer,
        });
    };

    onResultsSubmitted = (markedAnswers) => {
        socket.emit("results", { id: this.state.id, results: markedAnswers });
    };

    onMarkNow = () => {
        socket.emit("forceMark", { id: this.state.id });
    };

    onLeaveSubmitted = () => {
        const { cookies } = this.props;
        socket.emit("leave", { id: this.state.id, name: this.state.myName });
        cookies.remove("quizParty");
        this.setState({
            myName: "",
            joined: false,
        });
    };

    onFinishSubmitted = () => {
        socket.emit("finish", { id: this.state.id });
    };

    getCookieName = () => {
        const { cookies } = this.props;
        return cookies.get("quizParty") &&
            cookies.get("quizParty").quizId == this.state.id
            ? cookies.get("quizParty").name
            : "";
    };

    getName = (gameState) => {
        const { cookies } = this.props;
        let players = gameState.players.map((player) => player.name);
        let cookieName = this.getCookieName();
        if (cookieName && players.includes(cookieName)) {
            return cookieName;
        }
        // If cookie name isn't in players array, player will have to rejoin
        cookies.remove("quizParty");
        return "";
    };

    render() {
        return (
            <Grid
                textAlign="center"
                style={{ height: "100vh" }}
                verticalAlign="middle"
            >
                <Grid.Row>
                    <Grid.Column>
                        <div>
                            {this.state.joined ? (
                                <div>
                                    {this.state.gameState.active ? (
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
                                            onMarkNow={this.onMarkNow}
                                            onLeaveSubmitted={
                                                this.onLeaveSubmitted
                                            }
                                            onFinishSubmitted={
                                                this.onFinishSubmitted
                                            }
                                        />
                                    ) : (
                                        <FinishView
                                            gameState={this.state.gameState}
                                        />
                                    )}
                                </div>
                            ) : (
                                <JoinView
                                    gameState={this.state.gameState}
                                    onNameSubmitted={this.onNameSubmitted}
                                />
                            )}
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );
    }
}

export default withCookies(App);
