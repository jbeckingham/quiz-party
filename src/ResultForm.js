import React from 'react'
import { Input, Form, Button, TextArea, Header, Table, Label } from 'semantic-ui-react'

const getColour = i => {
    const colours = ['teal', 'pink', 'yellow', 'purple', 'orange', 'green']
    return colours[i % colours.length]
}

class ResultForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { results: {} };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        let newResults = this.state.results;
        let playerName = event.target.name;
        let answer = event.target.value;
        newResults[event.target.name] = parseFloat(event.target.value);
        this.setState({ results: newResults });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleSubmit(this.state.results);
    }

    getPlayerColour(name) {
        let names = this.props.gameState.players.map((player) => player.name);
        let i = names.indexOf(name);
        return getColour(i);
    }

    render() {
        return (<div>
            <Form onSubmit={this.handleSubmit} size='massive' style={{ width: '50%', margin: 'auto' }}>
                <Table basic="very">
                    <Table.Body>
                        {Object.keys(this.props.gameState.currentQuestion.answers).map((name, i) => (
                            <Table.Row key={name}>
                                <Table.Cell>
                                    <Label as="a" color={this.getPlayerColour(name)} size="huge" style={{ textAlign: "center" }}>{name}</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    <Header size="huge">{this.props.gameState.currentQuestion.answers[name]}</Header>
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
