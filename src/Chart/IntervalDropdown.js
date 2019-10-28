import React from 'react';
import Select from 'react-select';
import styled from 'styled-components';

const StyledSelect = styled(Select)`
    width: 200px;
`;

const suggestions = [
    {value: "1min", label: "1 Minute"},
    {value: "5min", label: "5 Minutes"},
    {value: "15min", label: "15 Minutes"},
    {value: "30min", label: "30 Minutes"},
    {value: "60min", label: "1 Hour"}
];

class IntervalDropdown extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChange = selectValue => {
        this.props.onValueChange(selectValue);
    }

    render() {
        const value = this.props.value;
        console.log(value);
        return (
            <StyledSelect
                inputId="react-select-single"
                placeholder="Select interval"
                options={suggestions}
                value={value}
                onChange={this.handleChange}
            />
        );
    }
}
export default IntervalDropdown