import React from 'react';
import { Container, Paper, Grid, Typography, Box } from '@material-ui/core';
import styled from 'styled-components';
import './App.css';


const GridContainer = styled(Grid)`
  padding-top: 15%;
`;

class Welcome extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <GridContainer container justify="center" alignItems="center" direction="column">
                <Grid item xs={3} />
                <Grid item xs={6}>
                    <Typography variant="h2" align="center">Welcome</Typography><br />
                    <Typography variant="h5" align="center">Click the menu item to get started</Typography>
                </Grid>
                <Grid item xs={3} />
            </GridContainer>
        );
    }
}

export default Welcome;
