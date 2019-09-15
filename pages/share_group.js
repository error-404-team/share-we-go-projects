import React from 'react';
import { Map, ConnectApiMaps } from '../lib/maps';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
// import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Chat from '../components/Chat';
import firebase from '../lib/firebase';
import '../css/place-autocomplete-and-directions.css';


const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  },
}));

function AutocompleteDirectionsHandler(google, map) {
  this.map = map;
  this.originPlaceId = null;
  this.destinationPlaceId = null;
  this.travelMode = 'WALKING';
  this.directionsService = new google.maps.DirectionsService;
  this.directionsRenderer = new google.maps.DirectionsRenderer;
  this.directionsRenderer.setMap(this.map);

  var me = this

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      firebase.database().ref(`/group_share_user/${user.uid}`).once('value').then(function (snapshot) {
        var data = (snapshot.val());
        
        me.setupPlaceChangedListener(data.host.geocoded_waypoints[0].place_id, 'ORIG');
        me.setupPlaceChangedListener(data.host.geocoded_waypoints[1].place_id, 'DEST');
        me.setupClickListener(data.host.request.travelMode);

      })
    }
  }
  )
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function (mode) {
  var me = this;

  me.travelMode = mode;
  me.route();
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
  place, mode) {
  var me = this;

  console.log(place);

  if (!place) {
    alert('Please select an option from the dropdown list.');
    return;
  }
  if (mode === 'ORIG') {
    me.originPlaceId = place;
  } else {
    me.destinationPlaceId = place;
  }
  me.route();
};

AutocompleteDirectionsHandler.prototype.route = function () {
  if (!this.originPlaceId || !this.destinationPlaceId) {
    return;
  }
  var me = this;

  this.directionsService.route(
    {
      origin: { 'placeId': this.originPlaceId },
      destination: { 'placeId': this.destinationPlaceId },
      travelMode: this.travelMode
    },
    function (response, status) {
      if (status === 'OK') {
        me.directionsRenderer.setDirections(response);
        // console.log(response);

      } else {
            alert('Directions request failed due to ' + status);
        // console.log(response, status);

      }
    });
};

function FinishedStep(props) {
  const classes = useStyles();

  return (
    <Map google={props.google}
      setStyle={{
        position: "absolute",
        overflow: "hidden",
        height: "100%",
        width: "100%",
      }}
      opts={{
        zoom: 15,
        center: { lat: -33.8688, lng: 151.2195 },
        disableDefaultUI: true,
        styles: [{
          featureType: 'poi.business',
          stylers: [{ visibility: 'on' }]
        },
        {
          featureType: 'transit',
          elementType: 'labels.icon',
          stylers: [{ visibility: 'off' }]
        }]
      }}
      DrawingOnMap={(google, map) => {
       new AutocompleteDirectionsHandler(google, map)
      }}
    >
      <div style={{ display: 'block' }}>
        <div id="mode-selector" className="controls">
          <p>ต้นทาง: -</p>
          <br />
          <p>ปลายทาง: -</p>
          <br />
          <p>เวลา: -</p>
        </div>
      </div>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          {/* <Fab color="secondary" aria-label="add" className={classes.fabButton}> */}
          {/* <QuestionAnswerIcon /> */}
          <Chat />
          {/* </Fab> */}
          <div className={classes.grow} />
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton edge="end" color="inherit">
            <MoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Map>
  )

}

export default ConnectApiMaps({
  apiKey: "AIzaSyCfdx1_dkKY9BejzU-We23YqfEynZtAIJc",
  libraries: ['places', 'geometry'],
})(FinishedStep)