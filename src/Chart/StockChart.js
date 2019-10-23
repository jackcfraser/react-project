import React from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper, FormGroup, FormControlLabel, Switch, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography, Container, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import moment from 'moment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import styled from 'styled-components';
import MomentUtils from '@date-io/moment';

const apiKey = "EJV63E9TK8YUSHV";

const StyledResponsiveContainer = styled(ResponsiveContainer)`
    text-align: center;
    margin: 0 auto;
`;

const StyledSpan = styled.span`
    text-align: center;
`;

const StyledPaper = styled(Paper)`
    padding: 20px 20px 20px 20px;
`;

const ChartTitle = styled(Container)`
    font-weight: bold;
    padding-bottom: 10px;
`;

const DateFormGroup = styled(FormGroup)`
    padding-top: 20px;
`;

class StockChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            items: {},
            stock: props.stock,
            interval: props.interval,
            volume: false,
            open: true,
            high: false,
            low: false,
            close: false,
            date: moment().subtract(30, 'days'),
            stockName: props.name,
            height: props.height
        }
    }

    componentDidMount() {
        console.log("Mounting StockChart.js");
        this.fetchStockData();
    }

    componentDidUpdate(prevProps){
        console.log("checking props...");
        if(prevProps.stock !== this.props.stock || prevProps.interval !== this.props.interval){
            console.log("prop change - updating");
            this.setState({
                isLoaded: false
            }, this.fetchStockData
            );
        }
    }

    fetchStockData(){

        const stock = this.props.stock;
        const interval = this.props.interval;

        var callURL = "https://www.alphavantage.co/query?apikey=" + apiKey + "&symbol=" + stock + "&interval=" + interval + "&function=TIME_SERIES_DAILY";
        console.log("Calling: " + callURL);
        fetch(callURL)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error: error
                    });
                }
            )

            console.log("Working?!");
    }

    toggleSwitch = (stateName) => event => {
        this.setState({
            [stateName]: event.target.checked
        });
    }

    toggleVolume = () => {
        this.setState({
            volume: !this.state.volume
        });
    }

    formatCost(tick) {
        return "$" + tick;
    }

    formatVolume(tick) {
        return tick / 1000000 + "m";
    }

    formatDate(tick) {
        console.log("Ticking: " + tick);
        return moment(tick).format('DD/MM');
    }

    handleDateChange = date => {
        this.setState({
            date: date
        });
    }

    render() {
        if (this.state.isLoaded) {
            // var data = this.state.items['Time Series (' + this.props.interval + ')'];
            var data = this.state.items['Time Series (Daily)'];
            var stockData = [];

            for (var obj in data) {
                if (moment(new Date(obj)).isSameOrAfter(moment(this.state.date), 'day')) {
                    stockData.unshift({
                        x: moment(new Date(obj)).format('DD/MM/YY'),
                        open: Number(data[obj]['1. open']),
                        high: Number(data[obj]['2. high']),
                        low: Number(data[obj]['3. low']),
                        close: Number(data[obj]['4. close']),
                        volume: Number(data[obj]['5. volume'])
                    });
                }
            }
            var errorMessage = this.state.items['Note'];

            console.log(stockData);
        }

        if (!this.state.isLoaded && errorMessage === undefined) {
            return (
                <StyledSpan><CircularProgress /></StyledSpan>
            );
        } else if (errorMessage !== undefined) {
            return (
                <Paper><StyledSpan>Maximum calls per minute reached. Please try again in a minute.</StyledSpan></Paper>
            );
        } else {
            const chart = (
                <LineChart data={stockData}>
                    <XAxis dataKey="x" />
                    {!this.state.volume ? <YAxis domain={['auto', 'auto']} type="number" tickFormatter={this.formatCost} /> : <YAxis tickFormatter={this.formatVolume} />}
                    <CartesianGrid stroke="#eee" strokeDasharray="1 1" />
                    <Tooltip />
                    <Legend verticalAlign="top" height={36} />
                    {this.state.open && !this.state.volume ? <Line type="monotone" dataKey="open" stroke="#ff5050" /> : null}
                    {this.state.high && !this.state.volume ? <Line type="monotone" dataKey="high" stroke="#cc9900" /> : null}
                    {this.state.low && !this.state.volume ? <Line type="monotone" dataKey="low" stroke="#33cc33" /> : null}
                    {this.state.close && !this.state.volume ? <Line type="monotone" dataKey="close" stroke="#3366ff" /> : null}
                    {this.state.volume ? <Line type="monotone" dataKey="volume" stroke="#33cccc" /> : null}
                </LineChart>
            );
            return (
                <StyledPaper>
                    <ChartTitle>{this.props.name}</ChartTitle>
                    <StyledResponsiveContainer height={this.state.height}>
                        {chart}
                    </StyledResponsiveContainer>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>Data Settings</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container justify="space-between">
                                <Grid item xs={6}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            disabled={this.state.volume}
                                            control={
                                                <Switch
                                                    checked={this.state.open}
                                                    onChange={this.toggleSwitch('open')} />
                                            }
                                            label="Open"
                                            labelPlacement="top" />
                                        <FormControlLabel
                                            disabled={this.state.volume}
                                            control={
                                                <Switch
                                                    checked={this.state.high}
                                                    onChange={this.toggleSwitch('high')} />
                                            }
                                            label="High"
                                            labelPlacement="top" />
                                        <FormControlLabel
                                            disabled={this.state.volume}
                                            control={
                                                <Switch
                                                    checked={this.state.low}
                                                    onChange={this.toggleSwitch('low')} />
                                            }
                                            label="Low"
                                            labelPlacement="top" />
                                        <FormControlLabel
                                            disabled={this.state.volume}
                                            control={
                                                <Switch
                                                    checked={this.state.close}
                                                    onChange={this.toggleSwitch('close')} />
                                            }
                                            label="Close"
                                            labelPlacement="top" />
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={this.state.volume}
                                                    onChange={this.toggleSwitch('volume')} />
                                            }
                                            label="Volume"
                                            labelPlacement="top" />
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={2}>
                                    <DateFormGroup>
                                        <FormControlLabel
                                            control={
                                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                                    <KeyboardDatePicker value={this.state.date} onChange={this.handleDateChange} format="DD/MM/YYYY"/>
                                                </MuiPickersUtilsProvider>
                                            } />
                                    </DateFormGroup>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </StyledPaper>
            );
        }
    }
}

export default StockChart