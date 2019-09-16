import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import TextFieldMargins from '../components/textbox1'
import TextFieldMargins2 from '../components/textbox2'
import geno from '../../share-we-go-projects/image/geno.jpg'
import ing from '../../share-we-go-projects/image/ing.jpg'
import bent from '../../share-we-go-projects/image/bent.jpg'



const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'top conner',
    color: theme.palette.text.secondary,
  },
}));


export default function FullWidthGrid() {
  const classes = useStyles();

return (
  <React.Fragment>
    <div className={classes.root}>
      <br></br><br></br><br></br>
      <Grid container spacing={6}>
        
        <Grid item xs={12}>
          <body bgcolor= "dddddd">
           <p>วันที่ (xx/xx/xxxx)</p>
          </body>
          <hr></hr>
          <Paper  className={classes.paper}>
            <img src={geno}  width="70" height='70' align='left' ></img>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <b>นายอัษฎาวุธ สาครเจริญ</b>
          <br></br>
          <TextFieldMargins></TextFieldMargins>
          <TextFieldMargins2></TextFieldMargins2>
           </Paper>
           <body bgcolor= "dddddd">
           <p>วันที่ (xx/xx/xxxx)</p>
           p2
          </body>
          <hr>
          </hr>
           <Paper  className={classes.paper}>
             <img src={ing}  width="70" height='70' align='left' ></img>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <b>นายธนพัฒน์ ทองนุกุล</b>
          <TextFieldMargins></TextFieldMargins>  
          <TextFieldMargins2></TextFieldMargins2>
           </Paper>
           <body bgcolor= "dddddd">
           <p>วันที่ (xx/xx/xxxx)</p>
          </body>
          
           <hr></hr>
           <Paper  className={classes.paper}><img src={bent}  border="0" width="70" height='70' align='left' border ='1'></img>
           &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <b>นายเอกรินท์ เพียงดี</b>
          <TextFieldMargins></TextFieldMargins> 
          <TextFieldMargins2></TextFieldMargins2>
           </Paper>
        </Grid>
      </Grid>
      
    </div>
    </React.Fragment>
  );
}


