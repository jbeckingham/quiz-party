import React, { useState } from "react";
import { Button, Icon } from "semantic-ui-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const QuizLink = ({ isMobile }) => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(true);
        setTimeout(() => setActive(false), 3000);
    };

    const linkText = (isMobile, active) => {
        if (!isMobile) {
            return active ? " Copied to clipboard" : "Copy link to quiz";
        }
        return active ? " Copied" : "Link";
    };

    return (
        <div className="link">
            <CopyToClipboard text={window.location.href} onCopy={handleClick}>
                <Button overflow="true" size="medium" color="pink">
                    <Icon
                        color={active ? "green" : "white"}
                        name="linkify"
                        size={!isMobile ? "large" : "small"}
                    />
                    {linkText(isMobile, active)}
                </Button>
            </CopyToClipboard>
        </div>
    );
};

export default QuizLink;
