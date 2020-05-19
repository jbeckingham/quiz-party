import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import JoinView from "./JoinView";
import QuizView from "./QuizView";
import FinishView from "./FinishView";
import Notification from "./Notification";
import { Grid } from "semantic-ui-react";
import { useCookies } from "react-cookie";
import { toast } from "react-semantic-toasts";

const Quiz = ({ match }) => {
    const id = match.params.id;

    const [cookies, setCookie, removeCookie] = useCookies(["quizParty"]);

    const [socket, setSocket] = useState(null);

    const [myName, setMyName] = useState("");
    const [joined, setJoined] = useState(false);
    const [gameState, setGameState] = useState({
        players: [],
        active: true,
        typing: [],
    });

    const isMobile = window.innerWidth < 468;

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
            console.log("state update");
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
            <Grid
                className={isMobile ? "main-quiz-mobile" : "main-quiz"}
                textAlign="center"
                verticalAlign="middle"
            >
                <Grid.Row>
                    <Grid.Column>
                        <div>
                            {joined ? (
                                <div>
                                    <Notification
                                        gameState={gameState}
                                        socket={socket}
                                    />
                                    {gameState.active ? (
                                        <QuizView
                                            gameState={gameState}
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
                                            onMarkNow={onMarkNow}
                                            onLeaveSubmitted={onLeaveSubmitted}
                                            onFinishSubmitted={
                                                onFinishSubmitted
                                            }
                                            onTyping={onTyping}
                                            isMobile={isMobile}
                                            socket={socket}
                                            onShowScores={onShowScores}
                                        />
                                    ) : (
                                        <FinishView gameState={gameState} />
                                    )}
                                </div>
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
    );
};

export default Quiz;
