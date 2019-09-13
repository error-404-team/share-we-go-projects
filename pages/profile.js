import React from 'react';
import ImageAvatars from "../components/midaiprofile";
import Personalform from "../components/personalInformation";
import BarAppShere from "../components/barappshere";
import { makeStyles } from '@material-ui/core/styles';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import Button from '@material-ui/core/Button';
import Link from "next/link"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
}));


function profile() {
    return (

        <React.Fragment>

  <Link href="../editprofileinput">
  <Button href="#text-buttons" className={classes.button}>
    <BorderColorIcon></BorderColorIcon>แก้ไขข้อมูล
    </Button>
    </Link>
            <BarAppShere></BarAppShere>
            <div>
            <ImageAvatars></ImageAvatars>
            <BottonEdit ></BottonEdit>
            
            </div>
            <Personalform></Personalform>
        </React.Fragment>

    );
}
export default profile;
