import React from 'react';
import { Map, ConnectApiMaps } from '../lib/maps';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import firebase from '../lib/firebase';
// import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

import 'react-chat-widget/lib/styles.css';
// import '../css/place-autocomplete-and-directions.css';

const useStyles = makeStyles(theme => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  menuButton: {
    marginRight: theme.spacing(2),
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
  const [
    mobileMoreAnchorEl,
    setMobileMoreAnchorEl
  ] = React.useState(null);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = 'primary-search-account-menu-mobile';
  function handleMobileMenuClose() {
    setMobileMoreAnchorEl(null);
  }
  function handleMobileMenuOpen(event) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => setMobileMoreAnchorEl(null)}>
        <p>ยกเลิก</p>
      </MenuItem>
    </Menu>
  );
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            กลุ่มเเชร์ 
        </Typography>
        <div className={classes.grow} />
        <IconButton
        aria-label="Show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
      {renderMobileMenu}
        </Toolbar>
      </AppBar>
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

      </Map>
      {/* <Widget
          handleNewUserMessage={this.handleNewUserMessage}
          // profileAvatar={logo}
          title="My new awesome title"
          subtitle="And my cool subtitle"
        /> */}
    </div>
  )

}

export default ConnectApiMaps({
  apiKey: "AIzaSyCfdx1_dkKY9BejzU-We23YqfEynZtAIJc",
  libraries: ['places', 'geometry'],
})(FinishedStep)