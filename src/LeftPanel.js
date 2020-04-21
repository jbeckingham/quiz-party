import React from "react";
import { Form, Button, Confirm, Table, Grid, GridRow } from "semantic-ui-react";
import LeaveForm from "./LeaveForm";
import QuizLink from "./QuizLink";

class LeftPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmOpen: false,
        };
        this.onLeaveSubmitted = props.onLeaveSubmitted.bind(this);
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
