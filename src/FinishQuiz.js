import React from "react";
import { Form, Button, Confirm } from "semantic-ui-react";

class FinishQuiz extends React.Component {
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
            <div className="finish">
                <Form size="massive" style={{ margin: "auto" }}>
                    <Button size="medium" color="yellow" onClick={this.show}>
                        Finish Quiz
                    </Button>
                    <Confirm
                        open={this.state.confirmOpen}
                        cancelButton="Never mind"
                        confirmButton="Yes I'm sure"
                        content="Are you sure you want to end the quiz? The scores will be revealed and you won't be able to ask any more questions!"
                        onCancel={this.handleCancel}
                        onConfirm={this.handleSubmit}
                    />
                </Form>
            </div>
        );
    }
}

export default FinishQuiz;
