import React from "react";
import { Input, Form, Message, Button } from "semantic-ui-react";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
        };

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
        let playerNames = this.props.gameState.players.map(
            (player) => player.name
        );
        let nameTaken = playerNames.includes(this.state.value);
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <Input
                            placeholder="Name"
                            size="massive"
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Button
                        disabled={!this.state.value || nameTaken}
                        type="submit"
                        size="huge"
                        primary
                        color="blue"
                        size="massive"
                    >
                        Join
                    </Button>
                </Form>
                {nameTaken && (
                    <Message
                        error
                        content="Someone is already using that name."
                    />
                )}
            </div>
        );
    }
}

export default NameForm;
