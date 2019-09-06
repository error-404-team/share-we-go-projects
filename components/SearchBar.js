import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import PropsTypes from 'prop-types';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import '../css/search-bar.css';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(255, 255, 255, 0)',
        }
    },
});



class SearchBar extends React.Component {
    render() {
        // รับค่า ความยาวของขนาดจอ ไว้ในตัวแปล w 
        var w = window.innerWidth
        // รับค่า ที่ถ่ายทอดมาจาก this.props.classes ให้อยู่ในตัวแปล classes
        const { classes } = this.props
        return (
            <div style={{
                flexGrow: 1,
                position: 'absolute',
                width: w,
                flexDirection: 'column'
            }}>
                <ThemeProvider theme={theme}>
                    <AppBar position="static"
                        color='primary'
                        elevation={0}
                    >
                        <Toolbar
                            className={classes.gutters}
                        >
                            {this.props.children}
                        </Toolbar>
                    </AppBar>
                </ThemeProvider>
            </div>
        )
    }
}

SearchBar.propsTypes = {
    google: PropsTypes.object,
    map: PropsTypes.object
}

// กำหนด style
const styles = {
    gutters: {
        paddingLeft: 25,
        paddingRight: 25
    }
}


export default withStyles(styles)(SearchBar);