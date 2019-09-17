import React, { useState } from 'react';
import Router from 'next/router';
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

import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

// import Personalform from "../components/personalInformation";

// import Link from "next/link";
import firebase from "../lib/firebase";
import { InputBase } from '@material-ui/core';

import { writeUserDataEdit } from '../firebase-database/write-data'

const useStyles = makeStyles({
    bigAvatar: {
        margin: 50,
        width: 200,
        height: 200
    },
    title: {
        fontSize: 14,
    },

});

export default function App() {

    const classes = useStyles();
    const [photoURL, setPhotoURL] = useState('https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiTltSo4MDkAhURUI8KHffBDJUQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.onlinewebfonts.com%2Ficon%2F227642&psig=AOvVaw0nPTqj6ZudRIcCKQWYbHEk&ust=1568015831780316');
    const [displayName, setDisplayName] = useState('-');
    const [email, setEmail] = useState('-');
    const [phoneNumber, setPhoneNumber] = useState('-');
    const [sex, setSex] = useState('');
    const [age, setAge] = useState('-');
    const [statusEdit, setStatusEdit] = useState(true);

    const displayNameInput = React.useRef(null);
    const emailInput = React.useRef(null);
    const phoneNumberInput = React.useRef(null);
    const sexInput = React.useRef(null);
    const ageInput = React.useRef(null);

    const currencies = [
        {
            value: '',
            label: 'ไม่ระบุ',
        },
        {
            value: 'man',
            label: 'Man',
        },
        {
            value: 'women',
            label: 'Women',
        }
    ];

    function displayNameInputUpdate(e) {
        setDisplayName(e.target.value)
    }

    function emailNameInputUpdate(e) {
        setEmail(e.target.value)
    }

    function phoneNumberInputUpdate(e) {
        setPhoneNumber(e.target.value)
    }

    const sexInputUpdate = e => {
        setSex( e.target.value )
    }

    function ageInputUpdate(e) {
        setAge(e.target.value)
    }

    function goBack() {
        Router.back()
    }

    function onEdit() {

        setStatusEdit(false)
    }


    function onSave() {
        firebase.auth().onAuthStateChanged((user) => {

            writeUserDataEdit(user.uid, {
                displayName: displayName,
                email: email,
                photoURL: photoURL,
                phoneNumber: phoneNumber,
                sex: sex,
                age: age
            })
        })
        setStatusEdit(true)
    }

    firebase.auth().onAuthStateChanged((user) => {

        if (user) {
            // console.log(user);
            firebase.database().ref('users/' + user.uid).on('value', function (user) {
                let data = (user.val())
                if (data.photoURL !== null) {

                    setPhotoURL(data.photoURL);
                }

                if (data.displayName !== null) {

                    setDisplayName(data.displayName);
                }

                if (data.email !== null) {

                    setEmail(data.email);
                }

                if (data.phoneNumber !== null) {

                    setPhoneNumber(data.phoneNumber);
                }

                if (data.sex !== null) {

                    setSex(data.sex);
                }

                if (data.age !== null) {

                    setAge(data.age);
                }
                // console.log(photo.val());

            })
        }
    })
    return (
        <React.Fragment>
            <AppBar position="static" >
                <Toolbar variant="dense" >
                    <IconButton onClick={goBack} edge="start" color="inherit" aria-label="menu">
                        <ArrowBackIcon />
                    </IconButton>
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
            {statusEdit === true
                ? (
                    <IconButton onClick={onEdit}  >
                        <BorderColorIcon></BorderColorIcon>
                        <span>แก้ไขข้อมูล</span>
                    </IconButton >
                )
                : (
                    <Button onClick={onSave}>บันทึก</Button>
                )
            }


            <Typography className={classes.title} color="textSecondary" gutterBottom>
                <p>ชื่อ: <InputBase ref={displayNameInput} onChange={displayNameInputUpdate} type="text" disabled={statusEdit} value={displayName} /> </p>
                <p>E-mail: <InputBase ref={emailInput} onChange={emailNameInputUpdate} type="text" disabled={statusEdit} value={email} /></p>
                <p>เบอร์โทรศัพท์: <InputBase ref={phoneNumberInput} onChange={phoneNumberInputUpdate} type="text" disabled={statusEdit} value={phoneNumber} /></p>
                <p>เพศ: <TextField
                    id="outlined-select-currency"
                    select
                    disabled={statusEdit}
                    value={sex}
                    onChange={sexInputUpdate}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                >
                    {currencies.map(option => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField></p>
                <p>อายุ: <InputBase ref={ageInput} onChange={ageInputUpdate} type="text" disabled={statusEdit} value={age} /></p>
            </Typography>
            {/* <Personalform></Personalform> */}

        </React.Fragment>

    );
}
