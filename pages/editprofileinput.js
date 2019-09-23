import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { writeUserData } from '../firebase-database/write-data';

import ImageAvatars from "../components/midaiprofile";

import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from "@material-ui/core/Toolbar";

import Link from "next/link";
import firebase from "../lib/firebase";

 
const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  input: {
    display: 'none',
  },
}
));

export default function InputEditProfile() {
  const classes = useStyles();
  const [displayName, setDisplayName] = useState('-');
  const [email, setEmail] = useState('-');
  const [phoneNumberd, setphoneNumber] = useState('-');
  const [sex, setSex] = useState('-');
  const [age, setAge] = useState('-');

  function MybuttonSave() {
    const  name = dName ;
    console.log(dName);
    const mail = demail ;
    console.log(demail);
    const phoneNum = dphoneNumber;
    console.log(dphoneNumber);
    
    
    
    
  }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
      console.log(user);
      firebase.database().ref('users/' + user.uid + '/displayName').on('value', function (params) {
        setDisplayName(params.val())
        console.log(params.val());
      })
    }
    if (user) {
      console.log(user);
      firebase.database().ref('users/' + user.uid + '/email').on('value', function (mail) {
        setEmail(mail.val());
        console.log(mail.val());
      })
    }
    if (user) {
      console.log(user);
      firebase.database().ref('users/' + user.uid + '/phoneNumber').on('value', function (phoneNum) {
        setphoneNumber(phoneNum.val())
        console.log(phoneNum.val());
      })
    }

    if (user) {
      console.log(user);
      firebase.database().ref('users/' + user.uid + '/sex').on('value', function (sexy) {
        setSex(sexy.val())
        console.log(sexy.val());
      })
    }

    if (user) {
      console.log(user);
      firebase.database().ref('users/' + user.uid + '/age').on('value', function (ryu) {
        setAge(age.val())
        console.log(age.val());
      })
    }
      if (user) {
        let uid = user.uid;
  // กำหนดชื่อตัวแปล และ แทนค่าลงในตัวแปล      
        
        let name = document.getElementById("name");
        let dName = name.value;

        let mail = document.getElementById("mail");
        let demail = mail.value;

        let photo = document.getElementById("photo");
        let dphotoURL = photo.value;

        let phone = document.getElementById("phoneNum");
        let dphoneNumber = phone.value;

        let sexy = document.getElementById("sexy");
        let dsex= sexy.value;

        let ryu = document.getElementById("ryu");
        let dage = ryu.value;


        writeUserData(uid, displayName, email, photoURL, phoneNumber, sex, age)

      }
    })
    // console.log(a.value)
  
  return (
    <React.Fragment>
      <AppBar position="static" >
          <Toolbar variant="dense" >
            <Link href="/profile">
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <ArrowBackIcon/>
                    </IconButton>
                    </Link>
                    <Typography variant="h6" color="inherit">
                        ข้อมูลผู้ใช้
                     </Typography>
                    </Toolbar>
            </AppBar>
      <label htmlFor="text-button-file">
        <Button component="span" className={classes.button}>
        <ImageAvatars></ImageAvatars>
        </Button>
      </label>
       

      <TextField
        label="ชื่อ"
        id="dName"
        value={displayName}
        className={classes.textField}
      />
      <TextField
        label="e-mail"
        id="demail"
        value={email}
        className={classes.textField}
      />
      <TextField
        label="เบอร์โทรศัพท์"
        id="dphoneNumber"
        Value=""
        className={classes.textField}
      />

      <TextField
        label="เพศ"
        id="dsex"
        Value={sex}
        className={classes.textField}
      />

      <TextField
        label="อายุ"
        id="dage"
        Value=
        className={classes.textField}
      />
{/* 
      <TextField
        label="สถานที่อยู่"
        id="when"
        Value=""
        className={classes.textField}
      /> */}

      <Button onClick={MybuttonSave}>บันทึก</Button>
      
    
    </React.Fragment>
  );
}
