import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from 'share-we-go-ui/CssBaseline';
import App from './App';
import theme from './theme';
import { ThemeProvider } from 'share-we-go-styles';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <App />
  </ThemeProvider>,
  document.querySelector('#root'),
);
