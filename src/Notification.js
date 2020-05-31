import React, { useEffect, useState } from "react";
import { SemanticToastContainer, toast } from "react-semantic-toasts";

const Notification = ({ socket }) => {
    useEffect(() => {
        socket.on("playerLeft", (name) => {
            toast({
                animation: "fly down",
                type: "warning",
                description: name + " has left the quiz",
                time: 5000,
            });
        });
        socket.on("quizFinished", (name) => {
            toast({
                animation: "fly down",
                type: "success",
                description: name + " has finished the quiz!",
                time: 20000,
            });
        });
        socket.on("scoresAdjusted", (names, admin) => {
            toast({
                animation: "fly down",
                type: "warning",
                description:
                    admin + " has adjusted the scores of: " + names.join(", "),
                time: 20000,
            });
        });
        socket.on("scoresToggled", (value, admin) => {
            const message = value
                ? admin + " has just shown the scores"
                : admin + " has just hidden the scores";
            toast({
                animation: "fly down",
                type: "warning",
                description: message,
                time: 20000,
            });
        });
    }, []);
    return (
        <div className="notification">
            <SemanticToastContainer className="container" />
        </div>
    );
};

export default Notification;
