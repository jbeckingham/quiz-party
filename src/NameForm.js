import React from "react";
import { Input, Form, Message } from "semantic-ui-react";

class NameForm extends React.Component {
    constructor(props) {
        super(props);
        //   this.names = this.props.gameState.players.map((player) => player.name);
        this.state = {
            value: "",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        //   this.names = this.props.gameState.players.map((player) => player.name);
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
                    <Input
                        placeholder="Name"
                        size="massive"
                        action={{
                            color: "blue",
                            size: "massive",
                            content: "Join",
                            disabled: !this.state.value || nameTaken,
                        }}
                        onChange={this.handleChange}
                    />
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
