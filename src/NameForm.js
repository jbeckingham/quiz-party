import React, { useState } from "react";
import { Input, Form, Message, Button } from "semantic-ui-react";

const NameForm = ({ gameState, handleSubmit }) => {
    const [value, setValue] = useState("");

    const onChange = (event) => setValue(event.target.value);
    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(value);
    };

    let playerNames = gameState.players.map((player) => player.name);
    let nameTaken = playerNames.includes(value);
    return (
        <>
            <Form onSubmit={onSubmit}>
                <Form.Field>
                    <Input
                        placeholder="Name"
                        size="massive"
                        onChange={onChange}
                    />
                </Form.Field>
                <Button
                    disabled={!value || nameTaken}
                    type="submit"
                    size="huge"
                    primary
                    color="blue"
                >
                    Join
                </Button>
            </Form>
            {nameTaken && (
                <Message error content="Someone is already using that name." />
            )}
        </>
    );
};

export default NameForm;
