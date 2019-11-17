import React from 'react';
import Header from './Header/HeaderBar';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import 'typeface-roboto';
import './App.css';

const theme = createMuiTheme({
  typography: {
    htmlFontSize: 18,
    fontFamily: "Roboto",
  },
});

class App extends React.Component {

  render() {
    console.log(process.env);
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
