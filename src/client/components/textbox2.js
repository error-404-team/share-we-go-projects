import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles2 = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 120,
    left: 150,
  },
}));

export default function TextFieldMargins2() {
  const classes = useStyles2();

  return (
    <div className={classes.container}>
      <TextField
        label="จุดสิ้นสุด"
        id="margin-none"
        placeholder="ปลายทาง"
        className={classes.textField}
      />
    </div>
  );
}