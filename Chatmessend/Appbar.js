import React from 'react';
// import './App.css';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from "@material-ui/core/Toolbar";

function AppII() {
  return (
   
    <React.Fragment>
      <AppBar position="fixed" >
        <Toolbar variant="dense" >
          <IconButton edge="start" color="inherit" aria-label="menu">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit"  >
            แชท
     </Typography>
        </Toolbar>
      </AppBar>
    </React.Fragment>
   
  );
}

export default AppII;