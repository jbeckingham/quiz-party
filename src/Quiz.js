import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import JoinView from "./JoinView";
import QuizView from "./QuizView";
import FinishView from "./FinishView";
import Notification from "./Notification";
import Admin from "./Admin/Admin";
import { Grid } from "semantic-ui-react";
import { useCookies } from "react-cookie";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
} from "react-router-dom";

const Quiz = ({ isMobile }) => {
    const { id, admin } = useParams();

    const [cookies, setCookie, removeCookie] = useCookies(["quizParty"]);

    const [socket, setSocket] = useState(null);

    const [myName, setMyName] = useState("");
    const [joined, setJoined] = useState(false);
    const [gameState, setGameState] = useState(null);

    useEffect(() => {
        const socket = socketIOClient(process.env.REACT_APP_API_ENDPOINT, {
            query: {
                id: id,
            },
        });

        const name = getCookieName(gameState);
        setMyName(name);
        setJoined(name ? true : false);

        setSocket(socket);
        socket.on("stateUpdated", (gameState) => {
            console.log(gameState);
            if (!gameState) {
                window.location.replace("/");
            } else {
                setGameState(gameState);
            }
        });
    }, []);

    const onNameSubmitted = (name) => {
        setCookie("quizParty", { name: name, quizId: id });
        setMyName(name);
        setJoined(true);
        socket.emit("join", { id, name });
    };

    const onQuestionSubmitted = (question) => {
        socket.emit("ask", {
            id: id,
            name: myName,
            text: question,
        });
    };

    const onAnswerSubmitted = (answer) => {
        socket.emit("answer", {
            id: id,
            name: myName,
            answer: answer,
        });
    };

    const onShowScores = () => {
        socket.emit("showScores", {
            id: id,
        });
    };

    const onResultsSubmitted = (markedAnswers) => {
        socket.emit("results", { id: id, results: markedAnswers });
    };

    const onMarkNow = () => {
        socket.emit("forceMark", { id: id });
    };

    const onLeaveSubmitted = () => {
        unsubscribeFromNotifiations();
        socket.emit("leave", { id: id, name: myName });
        removeCookie("quizParty");
        setMyName("");
        setJoined(false);
    };

    const onFinishSubmitted = () => {
        socket.emit("finish", { id: id, name: myName });
    };

    const onTyping = (active) => {
        socket.emit("typing", { id: id, name: myName, active: active });
    };

    const getCookieName = () => {
        return cookies.quizParty && cookies.quizParty.quizId == id
            ? cookies.quizParty.name
            : "";
    };

    const unsubscribeFromNotifiations = () => {
        socket.off("playerLeft");
        socket.off("quizFinished");
    };

    return (
        <>
            {gameState ? (
                <>
                    <Grid
                        className={isMobile ? "main-quiz-mobile" : "main-quiz"}
                        textAlign="center"
                        verticalAlign="middle"
                    >
                        <Grid.Row>
                            <Grid.Column>
                                <div>
                                    {joined ? (
                                        <>
                                            {admin ? (
                                                <>
                                                    <Admin
                                                        gameState={gameState}
                                                        socket={socket}
                                                        myName={myName}
                                                    />
                                                </>
                                            ) : (
                                                <div>
                                                    <Notification
                                                        gameState={gameState}
                                                        socket={socket}
                                                    />
                                                    {gameState.active ? (
                                                        <QuizView
                                                            gameState={
                                                                gameState
                                                            }
                                                            myName={myName}
                                                            onAnswerSubmitted={
                                                                onAnswerSubmitted
                                                            }
                                                            onQuestionSubmitted={
                                                                onQuestionSubmitted
                                                            }
                                                            onResultsSubmitted={
                                                                onResultsSubmitted
                                                            }
                                                            onMarkNow={
                                                                onMarkNow
                                                            }
                                                            onLeaveSubmitted={
                                                                onLeaveSubmitted
                                                            }
                                                            onFinishSubmitted={
                                                                onFinishSubmitted
                                                            }
                                                            onTyping={onTyping}
                                                            isMobile={isMobile}
                                                            socket={socket}
                                                            onShowScores={
                                                                onShowScores
                                                            }
                                                        />
                                                    ) : (
                                                        <FinishView
                                                            gameState={
                                                                gameState
                                                            }
                                                            socket={socket}
                                                        />
                                                    )}
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        <JoinView
                                            gameState={gameState}
                                            onNameSubmitted={onNameSubmitted}
                                        />
                                    )}
                                </div>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </>
            ) : (
                <p>Loading Quiz...</p>
            )}
        </>
    );
};

export default Quiz;
