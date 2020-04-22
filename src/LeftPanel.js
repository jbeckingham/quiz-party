import React from "react";
import { Grid, GridRow, Form, Button } from "semantic-ui-react";
import LeaveForm from "./LeaveForm";
import QuizLink from "./QuizLink";
import FinishQuiz from "./FinishQuiz";

const NewQuizLink = () => (
    <div className="new-quiz">
        <Form size="massive" style={{ margin: "auto" }}>
            <Button size="medium" color="blue">
                Start a New Quiz
            </Button>
        </Form>
    </div>
);

class LeftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmOpen: false,
        };
        this.onLeaveSubmitted = props.onLeaveSubmitted.bind(this);
        this.onFinishSubmitted = props.onFinishSubmitted.bind(this);
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
            <div className="left-panel">
                <Grid>
                    <GridRow>
                        <NewQuizLink />
                    </GridRow>
                    <GridRow>
                        <FinishQuiz handleSubmit={this.onFinishSubmitted} />
                    </GridRow>
                    <GridRow>
                        <QuizLink />
                    </GridRow>
                    <GridRow>
                        <LeaveForm handleSubmit={this.onLeaveSubmitted} />
                    </GridRow>
                </Grid>
            </div>
        );
    }
}

export default LeftPanel;
