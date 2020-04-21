import React from "react";
import { Input, Form, Message, Button, Grid, GridRow } from "semantic-ui-react";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            value: event.target.value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.value);
    }

    render() {
        return (
            <Grid textAlign="center">
                <GridRow>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Input
                                placeholder="Give your quiz a name!"
                                size="massive"
                                onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Button
                            disabled={!this.state.value}
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
        );
    }
}

export default Home;
