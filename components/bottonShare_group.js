import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Fab from '@material-ui/core/Fab';


import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';



const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
  fab: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

export default function ContainedButtons() {
  const classes = useStyles();

  return (
    <div>
      <Button variant="contained" className={classes.button}>
        เรียกรถ
      </Button>
      <Button variant="contained" color="primary" className={classes.button}>
        เเชท
      </Button>
     
      <div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
          <LocalTaxiIcon />
        </Fab>
      </div>

      <div>
      <Fab color="primary" aria-label="add" className={classes.fab}>
          <QuestionAnswerIcon />
        </Fab> 
      </div>

      
    </div>
  );
}

