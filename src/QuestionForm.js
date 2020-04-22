import React, { useState } from "react";
import { Form, Button, TextArea, Header, Message } from "semantic-ui-react";

const QuestionForm = ({ handleSubmit, gameState }) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(value);
    };

    const enoughPlayers = gameState.players.length > 1;
    const canAskQuestion = value && enoughPlayers;

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
