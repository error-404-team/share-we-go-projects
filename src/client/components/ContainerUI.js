import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import PropTypes from 'prop-types';

function ContainerUI(props) {
    return (
        <CssBaseline >
            <Container style={{ padding: 0 }} >
                <Typography component="div" style={{
                    backgroundColor: props.backgroundColor !== undefined
                        ? `${props.backgroundColor}`
                        : '#fff'
                    , height: props.height !== undefined
                        ? `${props.height}`
                        : '100vh'
                }} >
                    {props.children}
                </Typography>
            </Container>
        </CssBaseline>
    )
}

ContainerUI.propTypes = {
    backgroundColor: PropTypes.string,
    height: PropTypes.string
}

export default ContainerUI;