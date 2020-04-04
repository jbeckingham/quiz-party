import React from 'react'
import { Input, Form, Button, TextArea, Header,Table,Label } from 'semantic-ui-react'

class ResultForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { results: {} };
    this.gameState = props.gameState;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      let newResults = this.state.results;
      let playerName = event.target.name;
      let answer = event.target.value;
      newResults[event.target.name] = parseFloat(event.target.value);
      this.setState({results: newResults});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.handleSubmit(this.state.results);
  }

  render() {
    return (<div>
        <Form onSubmit={this.handleSubmit} size='massive' style={{ width: '50%', margin: 'auto' }}>
            <Table basic="very">
                <Table.Body>
                    {Object.keys(this.gameState.currentQuestion.answers).map((name, i) => (
                        <Table.Row key={name}>
                            <Table.Cell>
                                <Label as="a" size="huge" style={{textAlign: "center"}}>{name}</Label>
                            </Table.Cell>
                            <Table.Cell>
                                <Header size="huge">{this.gameState.currentQuestion.answers[name]}</Header>
                            </Table.Cell>
                            <Table.Cell>
                                <Header size="huge">
                                    <select name={name} value={this.state.value} onChange={this.handleChange}>
                                        <option value="1">Correct</option>
                                        <option value="0.5">I'll give ya half</option>
                                        <option value="0">Incorrect</option>
                                    </select>
                                </Header>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            <Button type='submit' size='huge' primary>Submit Results</Button>
        </Form>
    </div>
    )
  }
}

export default ResultForm;
