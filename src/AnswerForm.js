import React, { useState } from "react";
import { Input, Form, Button, Header } from "semantic-ui-react";

const AnswerForm = ({ handleSubmit }) => {
    const [value, setValue] = useState("");

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(value);
    };

    return (
        <Form
            onSubmit={onSubmit}
            size="massive"
            style={{ width: "50%", margin: "auto" }}
        >
            <Header as="h2">Enter your answer:</Header>
            <Form.Field>
                <Input onChange={onChange} />
            </Form.Field>
            <Button type="submit" size="huge" primary>
                Submit
            </Button>
        </Form>
    );
};

export default AnswerForm;
