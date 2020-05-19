import React, { useState } from "react";
import { Button, Header, Modal, Form, Input } from "semantic-ui-react";

const AnagramBuilder = () => {
    const [text, setText] = useState("");
    const [anagram, setAnagram] = useState(false);
    const [answer, setAnswer] = useState(false);

    const getAnagram = (event) => {
        event.preventDefault();
        // generate anagram and spaces
        setAnswer(text);
        setAnagram(scrambleText(text));
    };

    const addAnagramToQuestion = (event) => {
        event.preventDefault();
        // add anagram text to question box
        //close modal
    };

    const onChange = (event) => {
        setText(event.target.value);
    };

    const AnswerLetters = () => {
        return answer.replace(/ /g, "   ");
    };

    const AnagramHtml = () => (
        <div class="anagram-html">
            <h2>{anagram}</h2>
            <h2>
                <AnswerLetters />
            </h2>
        </div>
    );

    const scrambleText = (text) => {
        return text;
    };
    const anagramText = () => "Added anagram to question";

    return (
        <Modal trigger={<Button>Anagram Generator</Button>}>
            <Modal.Content className="anagram">
                <Modal.Description>
                    <Header as="h1">Anagram Builder</Header>
                    <Form
                        onSubmit={getAnagram}
                        size="massive"
                        style={{ width: "50%", margin: "auto" }}
                    >
                        <Form.Field>
                            <Input
                                placeholder="Enter words to scramble here..."
                                onChange={onChange}
                                autofocus
                            />
                        </Form.Field>
                        <Button
                            type="submit"
                            size="huge"
                            primary
                            disabled={!(text.length > 1)}
                        >
                            Generate Anagram
                        </Button>
                    </Form>
                    {anagram ? (
                        <AnagramHtml />
                    ) : (
                        <p>Generated Anagram will appear here...</p>
                    )}
                    <Form
                        onSubmit={addAnagramToQuestion}
                        size="massive"
                        style={{ width: "50%", margin: "auto" }}
                    >
                        <Button
                            type="submit"
                            size="huge"
                            primary
                            disabled={!anagram}
                        >
                            Add anagram to question
                        </Button>
                    </Form>
                </Modal.Description>
            </Modal.Content>
        </Modal>
    );
};

export default AnagramBuilder;
