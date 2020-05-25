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
    useLocation,
} from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import { Responsive } from "semantic-ui-react";

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
            isMobile: window.innerWidth < 902,
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

    handleOnUpdate = () => {
        this.setState({
            isMobile: window.innerWidth < 902,
        });
    };

    render() {
        return (
            <Responsive onUpdate={this.handleOnUpdate}>
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
                                    <Route path="/quiz/:id/:admin?">
                                        <Quiz
                                            isMobile={this.state.isMobile}
                                        ></Quiz>
                                    </Route>
                                </CookiesProvider>
                                <Redirect to="/" />
                            </Switch>
                        )}
                    </div>
                </Router>
            </Responsive>
        );
    }
}

export default withCookies(App);
