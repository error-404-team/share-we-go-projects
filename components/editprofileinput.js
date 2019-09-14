import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { writeUserData } from '../firebase-database/write-data';
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
}));
export default function InputEditProfile() {
  const classes = useStyles();

  function pullform() {
    firebase.auth().onAuthStateChanged((user) => {

      if (user) {
        let uid = user.uid;
  // กำหนดชื่อตัวแปล และ แทนค่าลงในตัวแปล      
        
        let name = document.getElementById("name");
        let displayName = name.value;

        let mail = document.getElementById("mail");
        let email = mail.value;

        let photo = document.getElementById("photo");
        let photoURL = photo.value;

        let phone = document.getElementById("phone");
        let phoneNumber = phone.value;

        let sexy = document.getElementById("sexy");
        let sex= sexy.value;

        let ryu= document.getElementById("ryu");
        let age = ryu.value;


        writeUserData(uid, displayName, email, photoURL, phoneNumber, sex, age)

      }
    })
    // console.log(a.value)

  }

  return (

    <React.Fragment>
      <Button>
        <Box>
    <Grid container justify="center" alignItems="center">
      <Avatar src={photoURL} className={classes.bigAvatar} />
    </Grid>
        </Box>
      </Button>
      <TextField
        label="ชื่อ"
        id="name"
        defaultValue=""
        className={classes.textField}
      />
      <TextField
        label="e-mail"
        id="email"
        defaultValue=""
        className={classes.textField}
      />
      <TextField
        label="เบอร์โทรศัพท์"
        id="phoneNumber"
        defaultValue=""
        className={classes.textField}
      />

      <TextField
        label="เพศ"
        id="sex"
        defaultValue=""
        className={classes.textField}
      />

      <TextField
        label="อายุ"
        id="age"
        defaultValue=""
        className={classes.textField}
      />

      <TextField
        label="สถานที่อยู่"
        id="when"
        defaultValue=""
        className={classes.textField}
      />

      <Button type="pullform" onClick={pullform}>บันทึก</Button>

    </React.Fragment>
  );
}
