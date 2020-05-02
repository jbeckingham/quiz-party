import React, { useState } from "react";
import { Form, Button, TextArea, Header, Message } from "semantic-ui-react";

const joinWords = (words) => {
    if (words.length === 1) {
        return words.slice(-1)[0];
    }
    return words.slice(0, -1).join(", ") + " and " + words.slice(-1)[0];
};

const QuestionForm = ({ handleSubmit, gameState, onTyping, myName }) => {
    const [value, setValue] = useState("");
    const [timeoutHandle, setTimeoutHandle] = useState(null);

    const onChange = (event) => {
        setValue(event.target.value);
        onTyping(Boolean(event.target.value));
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
        }
        setTimeoutHandle(
            setTimeout(() => {
                onTyping(false);
            }, 3000)
        );
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(value);
    };

    const enoughPlayers = gameState.players.length > 1;
    const canAskQuestion = value && enoughPlayers;
    const typing = gameState.typing.filter((player) => player != myName);
    const typingText = typing.length == 1 ? " is typing..." : " are typing...";
    const typingMessage = typing.length ? (
        <p>
            {joinWords(typing)} {typingText}
        </p>
    ) : null;

    return (
        <div>
            <Form
                onSubmit={onSubmit}
                size="massive"
                style={{ width: "50%", margin: "auto" }}
            >
                <Header as="h1">Somebody ask a question</Header>
                <Form.Field>
                    <TextArea
                        placeholder="Ask a question..."
                        onChange={onChange}
                        autofocus
                    />
                </Form.Field>
                {typingMessage}
                <Button
                    type="submit"
                    size="huge"
                    primary
                    disabled={!canAskQuestion}
                >
                    Ask
                </Button>
            </Form>
            {!enoughPlayers && (
                <Message
                    error
                    content="You will need to wait for others to join the quiz before you can ask a question."
                />
            )}
        </div>
    );
};

export default QuestionForm;
