import React from 'react'
import { Input, Form } from 'semantic-ui-react'

class NameForm extends React.Component {
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
      <Form onSubmit={this.handleSubmit}>
        <Input
          placeholder="Name"
          size="massive"
          action={{color: 'blue', size: 'massive', content: 'Join'}}
          onChange={this.handleChange} />
      </Form>
    );
  }
}

export default NameForm;
