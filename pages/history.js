import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Router from 'next/router';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import firebase from '../lib/firebase';


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));



export default function ControlledExpansionPanels() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [keys, setKeys] = React.useState([]);
  const [history, setHistory] = React.useState([]);


  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  function goBack() {
    Router.back();
  }


  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.database().ref(`/history/${user.uid}`).once('value').then(function (snapshot) {
        let data = (snapshot.val());
        let keys = Object.keys(snapshot.val());
        // let keys = snapshot.key;
        // console.log(data[dataKeys[0]].share);
        setHistory(data)
        setKeys(keys)



      })
    }
  })


  return (
    <React.Fragment>
      <CssBaseline />

      {/* app-bar */}
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton onClick={goBack} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">ประวัติการเดินทาง</Typography>
        </Toolbar>
      </AppBar>
      {/* end-app-bar */}
      <div className={classes.root}>
        {keys.map((key) =>
          <ExpansionPanel expanded={expanded === key} onChange={handleChange(`${key}`)}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography className={classes.heading}>เวลา: </Typography>
              <Typography className={classes.secondaryHeading}>{history[key].date_time.start_time}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <span>ต้นทาง: ${history[key].host.routes[0].legs[0].start_address}</span>
              <span>ปลายทาง: ${history[key].host.routes[0].legs[0].end_address}</span>
              <span>เริ่มการแชร์: ${history[key].date_time.start_time}</span>
              <span>ปิดการแชร์: ${history[key].date_time.end_time}</span>
              <span>ต้องการผู้ร่วมเดินทางเพิ่ม: ${history[key].number_of_travel} คน</span>
              <span>ต้องการร่วมเดินทางกับเพศ: ${history[key].gender}</span>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        )}
      </div>
    </React.Fragment>
  );
}