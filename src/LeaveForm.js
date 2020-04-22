import React, { useState } from "react";
import { Form, Button, Confirm } from "semantic-ui-react";

const LeaveForm = ({ handleSubmit }) => {
    const [open, setOpen] = useState(false);

    const show = () => setOpen(true);
    const cancel = () => setOpen(false);

    const onSubmit = (event) => {
        event.preventDefault();
        setOpen(false);
        handleSubmit();
    };

    return (
        <div className="leave">
            <Form size="massive" style={{ margin: "auto" }}>
                <Button size="medium" color="orange" onClick={show}>
                    Leave
                </Button>
                <Confirm
                    open={open}
                    cancelButton="Never mind"
                    confirmButton="Yes I'm sure"
                    content="Are you sure you want to leave? Your score will be set to 0 if you want to rejoin."
                    onCancel={cancel}
                    onConfirm={onSubmit}
                />
            </Form>
        </div>
    );
};

export default LeaveForm;
