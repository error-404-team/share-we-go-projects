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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RecentActorsIcon from '@material-ui/icons/RecentActors';
import CommuteIcon from '@material-ui/icons/Commute';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import WcIcon from '@material-ui/icons/Wc';

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
            <body>
              
            <center>
            <h4 body bgcolor="#607B8B">     <CommuteIcon></CommuteIcon>    ต้นทาง - ปลายทาง</h4>
              <hr></hr>
            </center>
              <b font color="607B8B"><u>ต้นทาง:</u></b> {history[key].host.routes[0].legs[0].start_address}
              <br></br>
              <b><u>ปลายทาง:</u></b> {history[key].host.routes[0].legs[0].end_address}
              <center>
              <h4>  <AccessTimeIcon></AccessTimeIcon>  เริ่มการแชร์ - ปิดการแชร์</h4>
              
              <hr border="5" shadow="5"></hr>
              <b><u>เริ่มการแชร์:</u></b> {history[key].date_time.start_time}
              <br></br>
              <b><u>ปิดการแชร์:</u></b> {history[key].date_time.end_time}
              <br></br>
              <h4>     <WcIcon></WcIcon>    ผู้ร่วมเดินทาง - เพศผู้ร่วมเดินทาง</h4>
              <hr></hr>
              <b><u>ต้องการผู้ร่วมเดินทางเพิ่ม:</u> </b> {history[key].number_of_travel} คน
              <br></br>
              <b><u>    ต้องการร่วมเดินทางกับเพศ:</u> </b> {history[key].gender}
              </center>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
            </body>
          </ExpansionPanel>
        )}
      </div>
    </React.Fragment>
  );
}