import React from "react";
import { SemanticToastContainer } from "react-semantic-toasts";

const Notification = () => {
    return (
        <div className="notification">
            <SemanticToastContainer className="container" />
        </div>
    );
};

export default Notification;
