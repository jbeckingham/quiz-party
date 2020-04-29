import React, { useState } from "react";
import { Form, Button, TextArea, Header, Message } from "semantic-ui-react";

const QuestionForm = ({ handleSubmit, gameState, onTyping, myName }) => {
    const [value, setValue] = useState("");
    const [timeoutHandle, setTimeoutHandle] = useState(null);

    const onChange = (event) => {
        setValue(event.target.value);
        onTyping(event.target.value ? 1 : 0);
        if (timeoutHandle) {
            clearTimeout(timeoutHandle);
        }
        setTimeoutHandle(
            setTimeout(() => {
                onTyping(0);
            }, 5000)
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
            {typing.join(", ")} {typingText}
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
