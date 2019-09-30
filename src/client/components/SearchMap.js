import React from 'react';
import PropsTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import { ThemeProvider, withStyles } from '@material-ui/styles';
// import { createMuiTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Autocomplete from '../lib/maps/components/Places/Autocomplete';

// const router = useRouter();


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
        const { google,map } = this.state;
        // รับค่า ที่ถ่ายทอดมาจาก this.props.classes ให้อยู่ในตัวแปล classes
        const { classes } = this.props

      // console.log(this.props.map);
      
        
        return (
            <Paper className={classes.root} elevation={2} >
                    <IconButton onClick={this.props.onClick} className={classes.iconButton} aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                <Divider className={classes.divider} />
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
    map: PropsTypes.object,
    onClick: PropsTypes.func
}


export default withStyles(styles)(SearchMap);