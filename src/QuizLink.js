import React from "react";
import { Form, Button } from "semantic-ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

class QuizLink extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: true,
        };
    }

    render() {
        return (
            <div className="link">
                <CopyToClipboard
                    text={window.location.href}
                    onCopy={() => {
                        // Maybe add copy confirmation pop up here
                    }}
                >
                    <Button
                        size="medium"
                        color="pink"
                        style={{ width: "80%", margin: "auto" }}
                    >
                        Copy link to quiz
                    </Button>
                </CopyToClipboard>
            </div>
        );
    }
}

export default QuizLink;
