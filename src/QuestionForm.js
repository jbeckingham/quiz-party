import React from 'react';
import { Input, Form, Button, TextArea, Header } from 'semantic-ui-react'

class QuestionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.value)
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} size='massive' style={{ width: '50%', margin: 'auto' }}>
        <Header as="h1">Somebody ask a question</Header>
        <Form.Field>
          <TextArea placeholder='Ask a question...' onChange={this.handleChange}/>
        </Form.Field>
        <Button type='submit' size='huge' primary>Submit</Button>
      </Form>
    );
  }
}

export default QuestionForm;
