import React, { useState } from "react";
import { Form, Button, Confirm } from "semantic-ui-react";

const FinishQuiz = ({ handleSubmit, isMobile }) => {
    const [open, setOpen] = useState(false);

    const show = () => setOpen(true);
    const cancel = () => setOpen(false);

    const onSubmit = (event) => {
        event.preventDefault();
        setOpen(false);
        handleSubmit();
    };

    return (
        <div className="finish">
            <Form size="massive" style={{ margin: "auto" }}>
                <Button size="medium" color="yellow" onClick={show}>
                    {!isMobile ? "Finish Quiz" : "Finish"}
                </Button>
                <Confirm
                    open={open}
                    cancelButton="Never mind"
                    confirmButton="Yes I'm sure"
                    content="Are you sure you want to end the quiz? The scores will be revealed and you won't be able to ask any more questions!"
                    onCancel={cancel}
                    onConfirm={onSubmit}
                />
            </Form>
        </div>
    );
};

export default FinishQuiz;
