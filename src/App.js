import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import JoinView from "./JoinView";
import QuizView from "./QuizView";
import { Grid } from "semantic-ui-react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import LeaveForm from "./LeaveForm";
import Home from "./Home";
import Quiz from "./Quiz";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const socket = socketIOClient("http://127.0.0.1:5000");

class App extends Component {
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            connected: false,
        };
    }

    componentDidMount() {
        socket.on("connected", (gameState) => {
            this.setState({
                connected: true,
            });
        });
        socket.on("quizAdded", (id) => {
            window.location.assign("/quiz/" + id);
        });
    }

    onNewQuiz = () => {
        socket.emit("newQuiz", { name: this.state.value });
    };

    render() {
        return (
            <Router>
                <div id="main">
                    {!this.state.connected ? (
                        <p>Unable to connect</p>
                    ) : (
                        <Switch>
                            <Route exact path="/">
                                <Home handleSubmit={this.onNewQuiz} />
                            </Route>
                            <Route path="/quiz/:id" component={Quiz} />
                        </Switch>
                    )}
                </div>
            </Router>
        );
    }
}

export default withCookies(App);
