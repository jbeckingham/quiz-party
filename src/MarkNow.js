import React from "react";
import { Form, Button, Confirm } from "semantic-ui-react";

class MarkNow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmOpen: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    show = () => this.setState({ confirmOpen: true });
    handleCancel = () => this.setState({ confirmOpen: false });

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ confirmOpen: false });
        this.props.handleSubmit();
    }

    render() {
        return (
            <div className="mark-now">
                <Form size="massive" style={{ width: "50%", margin: "auto" }}>
                    <Button size="medium" color="orange" onClick={this.show}>
                        Mark Answers Now
                    </Button>
                    <Confirm
                        open={this.state.confirmOpen}
                        cancelButton="Never mind"
                        confirmButton="Yes I'm sure"
                        content="Are you sure you want to mark answers now? Not all players have answered yet!"
                        onCancel={this.handleCancel}
                        onConfirm={this.handleSubmit}
                    />
                </Form>
            </div>
        );
    }
}

export default MarkNow;
