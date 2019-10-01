import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';
// import { GiftedChat } from 'react-web-gifted-chat';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import App1 from '../components/App1'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    fabButton: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
        // zIndex: 1,
        // top: -30,
        // left: 0,
        // right: 0,
        margin: '0 auto',
      },

      fabtwo: {
        position: 'absolute',
            bottom: theme.spacing(11),
            right: theme.spacing(2),
      },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});


export default function Chat(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const [messages, setMessages] = React.useState([])

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // function onSend(messages = []) {
    //     setMessages(messages)
    // }



    return (
        <React.Fragment>
            <Fab color="inherit" aria-label="add" className={classes.fabtwo}>
            <LocalTaxiIcon />
          </Fab>
          <span style={{
                        position:'absolute',
                        right:'-5%',
                        top:'-14%',
                    }}>
 <HighlightOffIcon></HighlightOffIcon>
                    </span>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {/* <GiftedChat
                        messages={messages}
                        onSend={(messages) => onSend(messages)}
                        user={{
                            id: 1,
                        }}
                    /> */}
                    <App1></App1>
                    {/* <App1></App1> */}
                </Fade>
            </Modal>
        </React.Fragment>
    );
}

