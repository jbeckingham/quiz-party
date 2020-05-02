import React from "react";
import { Message } from "semantic-ui-react";

const Notification = ({ gameState }) => {
    console.log(gameState);
    return (
        <div class="notification">
            {gameState.notification && (
                <Message warning content={gameState.notification} />
            )}
        </div>
    );
};

export default Notification;
