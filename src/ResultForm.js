import React from 'react'
import { Form, Button, Header, Table, Label, Select } from 'semantic-ui-react'

const getColour = i => {
    const colours = ['teal', 'pink', 'yellow', 'purple', 'orange', 'green']
    return colours[i % colours.length]
}

const resultOptions = [
    { key: 'correct', value: 1, text: 'Correct' },
    { key: 'half', value: 0.5, text: "I'll give ya half" },
    { key: 'incorrect', value: 0, text: 'Incorrect' }
  ]

class ResultForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { results: {} };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value, name) {
        this.setState({ results: { ...this.state.results, [name]: value} });
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
            <Form onSubmit={this.handleSubmit} style={{ width: '50%', margin: 'auto' }}>
                <Table basic="very">
                    <Table.Body>
                        {Object.keys(this.props.gameState.currentQuestion.answers).map((name, i) => (
                            <Table.Row key={name}>
                                <Table.Cell>
                                    <Label as="a" size="huge" color={this.getPlayerColour(name)} style={{ textAlign: "center" }}>{name}</Label>
                                </Table.Cell>
                                <Table.Cell>
                                    <Header size="huge" >{this.props.gameState.currentQuestion.answers[name]}</Header>
                                </Table.Cell>
                                <Table.Cell>
                                    <Header>
                                       <Select onChange={ (event, data) => this.handleChange(data.value, name) } placeholder='Select...' options={resultOptions} />
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
