import React, { useState } from "react";
import { Form, Button, Confirm } from "semantic-ui-react";

const MarkNow = ({ handleSubmit }) => {
    const [open, setOpen] = useState(false);

    const show = () => setOpen(true);
    const cancel = () => setOpen(false);
    const onSubmit = (event) => {
        event.preventDefault();
        setOpen(false);
        handleSubmit();
    };

    return (
        <div className="mark-now">
            <Form size="massive" style={{ width: "50%", margin: "auto" }}>
                <Button size="medium" color="orange" onClick={show}>
                    Mark Answers Now
                </Button>
                <Confirm
                    open={open}
                    cancelButton="Never mind"
                    confirmButton="Yes I'm sure"
                    content="Are you sure you want to mark answers now? Not all players have answered yet!"
                    onCancel={cancel}
                    onConfirm={onSubmit}
                />
            </Form>
        </div>
    );
};

export default MarkNow;
