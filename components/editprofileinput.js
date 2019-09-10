import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
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

export default function InputEditProfileName() {
  const classes = useStyles();

  return (
  
      <TextField
        label="ชื่อ"
        id="margin-none"
        defaultValue="ชื่อผู้ใช้"
        className={classes.textField}
      />
 );
}

export default function InputEditProfileSex() {
  const classes = useStyles();

  return (
  
      <TextField
        label="เพศ"
        id="margin-none"
        defaultValue="-"
        className={classes.textField}
      />
 );
}

export default function InputEditProfileAge() {
  const classes = useStyles();

  return (
  
      <TextField
        label="อายุ"
        id="margin-none"
        defaultValue=""
        className={classes.textField}
      />
 );
}

export default function InputEditProfileName() {
  const classes = useStyles();

  return (
  
      <TextField
        label="สถานที่"
        id="margin-none"
        defaultValue="ที่อยู่"
        className={classes.textField}
      />
 );
}
