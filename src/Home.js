import React, { useState } from "react";
import { Input, Form, Button, Grid, GridRow } from "semantic-ui-react";

const Home = ({ handleSubmit }) => {
    const [name, setName] = useState("");

    const onChange = (event) => setName(event.target.value);

    const onSubmit = (event) => {
        event.preventDefault();
        handleSubmit(name);
    };

    return (
        <Grid
            textAlign="center"
            style={{ height: "100vh" }}
            verticalAlign="middle"
        >
            <Grid.Row>
                <Grid.Column>
                    <div>
                        <Grid textAlign="center">
                            <GridRow>
                                <Form onSubmit={onSubmit}>
                                    <Form.Field>
                                        <Input
                                            placeholder="Give your quiz a name!"
                                            size="massive"
                                            onChange={onChange}
                                            autoFocus
                                        />
                                    </Form.Field>
                                    <Button
                                        disabled={!name}
                                        type="submit"
                                        size="huge"
                                        primary
                                        color="blue"
                                        size="massive"
                                    >
                                        Start a new quiz
                                    </Button>
                                </Form>
                            </GridRow>
                        </Grid>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
};

export default Home;
