import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const theme = createMuiTheme({
    palette: {
      primary: {main: '#e3f2fd'},
    }
  });

export default function CircularUnderLoad() {
    return (
        <ThemeProvider theme={theme}>
            <CircularProgress disableShrink color="primary" />
        </ThemeProvider>
        )
}
