import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import 'typeface-roboto';
import StockChart from './Chart/StockChart';
import { Container, Grid, Paper, FormGroup, FormControlLabel, Typography } from '@material-ui/core';
import styled from 'styled-components';
import StockSearch from './Component/StockSearch';
import IntervalDropdown from './Component/IntervalDropdown';
import 'typeface-roboto';

const theme = createMuiTheme({
    typography: {
        htmlFontSize: 18,
        fontFamily: "Roboto"
    },
});

const StyledGrid = styled(Grid)`
    text-align: center;
    padding-bottom: 20px;
`;

const StyledContentContainer = styled(Container)`
    padding-top: 20px;
`;

const StyledPaper = styled(Paper)`
    padding: 5px;
`;

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            selectedStockValue: '',
            selectedStockName: '',
            selectedIntervalValue: ''
        });
    }

    handleStockChange = event => {
        this.setState({
            selectedStockValue: event.value,
            selectedStockName: event.label
        });
    }

    handleIntervalChange = event => {
        this.setState({
            selectedIntervalValue: event.value
        });
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <StyledContentContainer fixed>
                    <StyledGrid item xs={12}>
                        <StyledPaper>
                            <Grid container justify="center" alignItems="center" direction="column">
                                <Grid item xs={12}>
                                    <FormGroup row>
                                        <Container className="search-container">
                                            <Typography variant="h5">Search</Typography>
                                        </Container>
                                    </FormGroup>
                                    <FormGroup row>
                                        <FormControlLabel control={<StockSearch onValueChange={this.handleStockChange} />} />
                                        <FormControlLabel control={<IntervalDropdown onValueChange={this.handleIntervalChange} />} />
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </StyledPaper>
                    </StyledGrid>
                    <StyledGrid container spacing={3}>
                        <StyledGrid item xs={12}>
                            {this.state.selectedStockValue === '' || this.state.selectedIntervalValue === '' ? null : <StockChart stock={this.state.selectedStockValue} interval={this.state.selectedIntervalValue} name={this.state.selectedStockName} height={400} />}
                        </StyledGrid>
                    </StyledGrid>
                </StyledContentContainer>
            </ThemeProvider>
        )
    }
}
export default About