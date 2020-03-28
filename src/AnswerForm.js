import React, { Component } from 'react';

class AnswerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>{this.props.gameState.question.name} asked a question:</p>
        <p>{this.props.gameState.question.text}</p>
        <p>Your Answer:</p>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default AnswerForm;
