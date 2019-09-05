import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ContainerUI from '../components/ContainerUI';
import CircularUnderLoad from '../components/CircularUnderLoad';
import Logo from '../svgs/icon.svg';

const Loading = (props) => {
    const [state, setState] = React.useState(true);
    const classes = useStyles();

    if (props.state == false) {
        setState(false)
    }

    return (
        <React.Fragment>
            <ContainerUI backgroundColor='#274D7D' height='100vh'>
                <Typography component="div" className={classes.root}>
                    {state == true
                        ? <BeforeLoading />
                        : <AfterLoading />
                    }
                </Typography>
            </ContainerUI>
        </React.Fragment>
    )
}

const BeforeLoading = () => {
    return <Logo style={{ margin: 10, width: 200, height: 250, }} />
}

const AfterLoading = () => {
    return <CircularUnderLoad />
}

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#274D7D',
    }
}));

Loading.propTypes = {
    state: PropTypes.bool
}

export default Loading;