import React from 'react';
import Typography from '@material-ui/core/Typography';
import ContainerUI from '../components/ContainerUI';
import CircularUnderLoad from '../components/CircularUnderLoad';
import Logo from '../svgs/icon.svg';

const Loading = () => {
    return (
        <React.Fragment>
            <ContainerUI backgroundColor='#274D7D' height='100vh'>
                <Typography component="div" style={{
                    flex: 1,
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#274D7D',
                }}>
                    <Logo style={{
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

const BeforeLoading = () => {
    return <Logo style={{ margin: 10, width: 200, height: 250, }} />
}
const AfterLoading = () => {
    return <CircularUnderLoad />
}



export default Loading;