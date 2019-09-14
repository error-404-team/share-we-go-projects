import React, { useState } from 'react';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from "@material-ui/core/Toolbar";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

import Box from '@material-ui/core/Box';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Button from '@material-ui/core/Button';

import Personalform from "../components/personalInformation";

import Link from "next/link";
import firebase from "../lib/firebase";

const useStyles = makeStyles({
  bigAvatar: {
    margin: 50,
    width: 200,
    height: 200
  },

});

export default function App() {

    const classes = useStyles();
    const [photoURL, setPhotoURL] = useState('https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiTltSo4MDkAhURUI8KHffBDJUQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.onlinewebfonts.com%2Ficon%2F227642&psig=AOvVaw0nPTqj6ZudRIcCKQWYbHEk&ust=1568015831780316');

    const [displayName, setDisplayName] = useState('-');
    
    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            console.log(user);
            firebase.database().ref('users/' + user.uid + '/photoURL').on('value', function (photo) {
                setPhotoURL(photo.val())
                console.log(photo.val());

            })
        }
    })
    return (
        <React.Fragment>
            <AppBar position="static" >
                <Toolbar variant="dense" >
                    <Link href="/index">
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <ArrowBackIcon />
                    </IconButton>
                    </Link>
                    <Typography variant="h6" color="inherit">
                        ข้อมูลผู้ใช้
                     </Typography>
                </Toolbar>

            </AppBar>

    <Box>
        <Grid container justify="center" alignItems="center">
      <Avatar src={photoURL} className={classes.bigAvatar} />
        </Grid>
    </Box>

    <Link href="/editprofileinput">
        <Button href="#text-buttons" >
            <BorderColorIcon></BorderColorIcon>แก้ไขข้อมูล
        </Button>
     </Link>

    <Personalform></Personalform>

        </React.Fragment>

    );
}
