import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ContainerUI from '../components/ContainerUI';
import CircularUnderLoad from '../components/CircularUnderLoad';
import LOGO from '../img/LOGO_AI_V7.png';

const Loading = (props) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <ContainerUI backgroundColor='#274D7D' height='100vh'>
                <Typography component="div" className={classes.root}>
                    <img src={LOGO} style={{
                        margin: 10,
                        width: 200,
                        height: 250,
                    }} />
                    <CircularUnderLoad />
                </Typography>
            </ContainerUI>
        </React.Fragment>
    )
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

export default Loading;