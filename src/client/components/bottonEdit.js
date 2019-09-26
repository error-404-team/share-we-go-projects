import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Button from '@material-ui/core/Button';
import Link from "next/link";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function BottonEdit() {
  const classes = useStyles();

  return (
    <Link href="/editprofileinput">
  <Button href="#text-buttons" className={classes.button}>
    <BorderColorIcon></BorderColorIcon>แก้ไขข้อมูล
    </Button>
    </Link>
  );
}
