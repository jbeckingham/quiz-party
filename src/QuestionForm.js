import React from "react";
import { Form, Button, TextArea, Header, Message } from "semantic-ui-react";

class QuestionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { value: "" };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.value);
    }

    render() {
        let enoughPlayers = this.props.gameState.players.length > 1;
        let canAskQuestion = this.state.value && enoughPlayers;
        return (
            <div>
                <Form
                    onSubmit={this.handleSubmit}
                    size="massive"
                    style={{ width: "50%", margin: "auto" }}
                >
                    <Header as="h1">Somebody ask a question</Header>
                    <Form.Field>
                        <TextArea
                            placeholder="Ask a question..."
                            onChange={this.handleChange}
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
    }
}

export default QuestionForm;
