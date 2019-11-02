import React from 'react';
import Header from './Header/HeaderBar';
import { Grid } from '@material-ui/core';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import styled from 'styled-components';

import 'typeface-roboto';
import './App.css';

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 18,
    fontFamily: "Roboto",
  },
});

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div id="root">
          <Header />
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
