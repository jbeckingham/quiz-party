import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const QuizLink = () => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(true);
        setTimeout(() => setActive(false), 3000);
    };

    return (
        <div className="link">
            <CopyToClipboard text={window.location.href} onCopy={handleClick}>
                <Button size="medium" color="pink">
                    <Icon
                        color={active ? "green" : "grey"}
                        fitted
                        name="linkify"
                        size="large"
                    />
                    {active ? " Copied to clipboard!" : "Copy link to quiz"}
                </Button>
            </CopyToClipboard>
        </div>
    );
};

export default QuizLink;
