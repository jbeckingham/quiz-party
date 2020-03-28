import React from 'react'
import { Grid, } from 'semantic-ui-react'
import NameForm from './NameForm'

const JoinView = ({onNameSubmitted}) => 
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column>
            <NameForm handleSubmit={onNameSubmitted}/>
        </Grid.Column>
    </Grid>

export default JoinView;
