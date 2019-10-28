import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
    width: 350px;
`;

class GeoSearch extends React.Component {
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
        //todo
    }

    render() {
        const value = this.props.value
        return (
            <StyledSelect
                inputId="react-select-single"
                placeholder="Search"
                options={this.state.suggestions}
                value={value}
                onChange={this.handleChange}
                onKeyDown={this.keyDown}
            />
        );
    }
}
export default GeoSearch