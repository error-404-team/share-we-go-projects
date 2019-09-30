import React, { useState } from 'react';
// import Router from 'next/router';
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from "@material-ui/core/Toolbar";

// import { makeStyles } from '@material-ui/core/styles';
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

import { writeUserDataEdit } from '../../server/firebase-database/write-data'


export default class Profile extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            photoURL: 'https://www.google.com/url?sa=i&source=images&cd=&ved=2ahUKEwiTltSo4MDkAhURUI8KHffBDJUQjRx6BAgBEAQ&url=https%3A%2F%2Fwww.onlinewebfonts.com%2Ficon%2F227642&psig=AOvVaw0nPTqj6ZudRIcCKQWYbHEk&ust=1568015831780316',
            displayName: '-',
            email: '-',
            phoneNumber: '-',
            sex: '',
            age: '-',
            statusEdit: true,
            currencies: [
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
            ]
        }

        this.displayNameInput = React.createRef()
        this.emailInput = React.createRef()
        this.sexInput = React.createRef()
        this.ageInput = React.createRef()
    }


    displayNameInputUpdate(e) {
        this.setState({ displayName: e.target.value })
    }

    emailNameInputUpdate(e) {
        this.setState({ email: e.target.value })
    }

    phoneNumberInputUpdate(e) {
        this.setState({ phoneNumber: e.target.value })
    }

    sexInputUpdate = (e) => {
        this.setState({ sex: e.target.value })
    }

    ageInputUpdate(e) {
        this.setState({ age: e.target.value })
    }

    goBack() {
        this.props.history.goBack()
    }

    onEdit() {

        this.setState({ statusEdit: false })
    }


    onSave() {
        let data = {
            displayName: this.state.displayName,
            email: this.state.email,
            photoURL: this.state.photoURL,
            phoneNumber: this.state.phoneNumber,
            sex: this.state.sex,
            age: this.state.age
        }

        firebase.auth().onAuthStateChanged((user) => {

            writeUserDataEdit(user.uid, data)
        })
        this.setState({ statusEdit: true })
    }

    componentDidMount() {
        const me = this;
        firebase.auth().onAuthStateChanged((user) => {

            if (user) {
                // console.log(user);
                firebase.database().ref('users/' + user.uid).on('value', function (user) {
                    const data = (user.val())
                    if (data.photoURL !== null) {

                        me.setState({ photoURL: data.photoURL });
                    }

                    if (data.displayName !== null) {

                        me.setState({ displayName: data.displayName });
                    }

                    if (data.email !== null) {

                        me.setState({ email: data.email });
                    }

                    if (data.phoneNumber !== null) {

                        me.setState({ phoneNumber: data.phoneNumber });
                    }

                    if (data.sex !== null) {

                        me.setState({ sex: data.sex });
                    }

                    if (data.age !== null) {

                        me.setState({ age: data.age });
                    }
                    // console.log(photo.val());

                })
            }
        })
    }

    render() {
        return (
            <React.Fragment>
                <AppBar position="static" >
                    <Toolbar variant="dense" >
                        <IconButton onClick={this.goBack.bind(this)} edge="start" color="inherit" aria-label="menu">
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit">
                            ข้อมูลผู้ใช้
                     </Typography>
                    </Toolbar>

                </AppBar>

                <Box>
                    <Grid container justify="center" alignItems="center">
                        <Avatar src={this.state.photoURL}
                            style={{
                                margin: 50,
                                width: 200,
                                height: 200
                            }} />
                    </Grid>
                </Box>
                {this.state.statusEdit === true
                    ? (
                        <IconButton onClick={this.onEdit.bind(this)}  >
                            <BorderColorIcon></BorderColorIcon>
                            <span>แก้ไขข้อมูล</span>
                        </IconButton >
                    )
                    : (
                        <Button onClick={this.onSave.bind(this)}>บันทึก</Button>
                    )
                }


                <Typography style={{ fontSize: 14, }} color="textSecondary" gutterBottom>
                    <p>ชื่อ: <InputBase ref={this.displayNameInput} onChange={this.displayNameInputUpdate.bind(this)} type="text" disabled={this.state.statusEdit} value={this.state.displayName} /> </p>
                    <p>E-mail: <InputBase ref={this.emailInput} onChange={this.emailNameInputUpdate.bind(this)} type="text" disabled={this.state.statusEdit} value={this.state.email} /></p>
                    <p>เบอร์โทรศัพท์: <InputBase ref={this.phoneNumberInput} onChange={this.phoneNumberInputUpdate.bind(this)} type="text" disabled={this.state.statusEdit} value={this.state.phoneNumber} /></p>
                    <p>เพศ: <TextField
                        id="outlined-select-currency"
                        select
                        disabled={this.state.statusEdit}
                        value={this.state.sex}
                        onChange={this.sexInputUpdate.bind(this)}
                        SelectProps={{
                            MenuProps: {
                                // className: classes.menu,
                            },
                        }}
                    >
                        {this.state.currencies.map(option => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField></p>
                    <p>อายุ: <InputBase ref={this.ageInput} onChange={this.ageInputUpdate.bind(this)} type="text" disabled={this.state.statusEdit} value={this.state.age} /></p>
                </Typography>
                {/* <Personalform></Personalform> */}

            </React.Fragment>

        );
    }
}
