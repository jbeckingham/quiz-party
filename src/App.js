import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import "semantic-ui-css/semantic.min.css";
import "./App.css";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import Home from "./Home";
import Quiz from "./Quiz";
import Admin from "./Admin";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";

require("dotenv").config();

const socket = socketIOClient(process.env.REACT_APP_API_ENDPOINT);

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
    }

    onNewQuiz = (name) => {
        socket.emit("newQuiz", { name: name }, (id) => {
            window.location.assign("/quiz/" + id);
        });
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
                            <CookiesProvider>
                                <Route path="/quiz/:id" component={Quiz} />
                            </CookiesProvider>
                            <Redirect to="/" />
                        </Switch>
                    )}
                </div>
            </Router>
        );
    }
}

export default withCookies(App);
