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
                time: 5000,
            });
        });
        socket.on("scoresAdjusted", ({ playersAdjusted, admin }) => {
            toast({
                animation: "fly down",
                type: "warning",
                description:
                    admin +
                    " has adjusted the scores of: " +
                    playersAdjusted.join(", "),
                time: 5000,
            });
        });
        socket.on("playerRemoved", ({ name, admin }) => {
            toast({
                animation: "fly down",
                type: "warning",
                description: admin + " kicked out " + name + " from the quiz.",
                time: 5000,
            });
        });
        socket.on("scoresToggled", ({ toggle, admin }) => {
            const message = toggle
                ? admin + " has just shown the scores"
                : admin + " has just hidden the scores";
            toast({
                animation: "fly down",
                type: "warning",
                description: message,
                time: 5000,
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
