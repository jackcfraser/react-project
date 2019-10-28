import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const apiKey = "EJV63E9TK8YUSHV";

const StyledSelect = styled(Select)`
    width: 350px;
`;

class StockSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            suggestions: []
        }
    }

    handleChange = selectValue => {
        this.props.onValueChange(selectValue);
    }

    keyDown = event => {
        // The reason for the need to press the enter key on the autocomplete field to search is that I only have 5 API requests per minute.
        // I haven't gotten around to set up some sort of "typing-delay" method for searching yet.
        if (event.key === "Enter") {
            var callURL = "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&apikey=" + apiKey + "&keywords=" + event.target.value;
            fetch(callURL)
                .then(res => res.json())
                .then(
                    (result) => {
                        var newSuggestions = [];
                        for (var obj in result['bestMatches']) {
                            newSuggestions.push({ value: result['bestMatches'][obj]['1. symbol'], label: result['bestMatches'][obj]['1. symbol'] + ' - ' + result['bestMatches'][obj]['2. name'] });
                        }

                        this.setState({
                            isLoaded: true,
                            suggestions: newSuggestions
                        });
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error: error
                        });
                    }
                )
        }
    }

    render() {
        const value = this.props.value
        return (
            <StyledSelect
                inputId="react-select-single"
                placeholder="Select stock (enter to search)"
                options={this.state.suggestions}
                value={value}
                onChange={this.handleChange}
                onKeyDown={this.keyDown}
            />
        );
    }
}
export default StockSearch