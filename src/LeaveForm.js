import React from "react";
import { Form, Button, Confirm } from "semantic-ui-react";

class LeaveForm extends React.Component {
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
            <div className="leave">
                <Form size="massive" style={{ width: "50%", margin: "auto" }}>
                    <Button size="medium" color="orange" onClick={this.show}>
                        Leave
                    </Button>
                    <Confirm
                        open={this.state.confirmOpen}
                        cancelButton="Never mind"
                        confirmButton="Yes I'm sure"
                        content="Are you sure you want to leave? Your score will be set to 0 if you want to rejoin."
                        onCancel={this.handleCancel}
                        onConfirm={this.handleSubmit}
                    />
                </Form>
            </div>
        );
    }
}

export default LeaveForm;
