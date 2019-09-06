import React from 'react';
import PropsTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, withStyles } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import Link from 'next/link';
// import { useRouter } from 'next/router';

// import SearchIcon from '@material-ui/icons/Search';
import AddLocationIcon from '@material-ui/icons/AddLocation';

import Autocomplete from '../lib/maps/components/Places/Autocomplete';

// const router = useRouter();

// กำหนด  theme view
const theme = createMuiTheme({
    palette: {
        primary: {
            main: 'rgba(22, 109, 202, 0.81)',
        }
    },
});

class SearchMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            ...props,
            mapApiLoaded: false,
            places: [],
        };
    }

    componentDidMount() {
        //  set mapApiLoaded in object state ให้ค่า = true
        this.setState({
            mapApiLoaded: true,
        });
    };

    setPlace = ({ place } = this.props) => {
        // รับค่า ที่ถ่ายทอดมาจาก this.props.place ให้อยู่ในตัวแปล place
        // ทำการ กำหนด places ใน state ให้ = ค่าที่อยู่ใน place
        this.setState({ places: [place] });
    };

    render() {
        // รับค่า ที่ถ่ายทอดมาจาก this.state.google ให้อยู่ในตัวแปล google
        const { google } = this.state;
        // รับค่า ที่ถ่ายทอดมาจาก this.props.classes ให้อยู่ในตัวแปล classes
        const { classes } = this.props

      
        
        return (
            <Paper className={classes.root} elevation={2} >
                <Link href='/home'>
                    <IconButton className={classes.iconButton} aria-label="Menu">
                        <HomeIcon />
                    </IconButton>
                </Link>
                <Autocomplete
                    map={this.props.map}
                    google={google}
                    setPlace={this.setPlace}
                    style={{
                        color: 'inherit',
                        padding: '0px 0px',
                        width: '-webkit-fill-available',
                    }}
                />
                <Divider className={classes.divider} />
                <ThemeProvider theme={theme}>
                    <Link href='/share_location' >
                        <IconButton color="primary" className={classes.iconButton}>
                            <AddLocationIcon />
                        </IconButton>
                    </Link>
                </ThemeProvider>
            </Paper>
        )
    }
}

// กำหนด style
const styles = {
    root: {
        borderRadius: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.79)',
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.79)',
        },
        marginRight: 5,
        marginLeft: 15,
        marginTop: 40,
        display: 'flex',
        alignItems: 'center',
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
}

SearchMap.propsTypes = {
    google: PropsTypes.object,
    map: PropsTypes.object
}


export default withStyles(styles)(SearchMap);