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

function initMap(google, map) {
  // this.map = map;
  var markerArray = [];

  var modeSelector = document.getElementById('mode-selector');
  map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);

  var directionsService = new google.maps.DirectionsService;

  // Create a renderer for directions and bind it to the map.
  var directionsRenderer = new google.maps.DirectionsRenderer({ map: map });

  // Instantiate an info window to hold step text.
  var stepDisplay = new google.maps.InfoWindow;

  // Display the route between the initial start and end selections.
  calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map);

  var onChangeHandler = function () {
    calculateAndDisplayRoute(
      directionsRenderer, directionsService, markerArray, stepDisplay, map);
  };
}

function calculateAndDisplayRoute(directionsRenderer, directionsService,
  markerArray, stepDisplay, map) {
  // First, remove any existing markers from the map.
  for (var i = 0; i < markerArray.length; i++) {
    markerArray[i].setMap(null);
  }

  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService.route({
    origin: "penn station, new york, ny",
    destination: "260 Broadway New York NY 10007",
    travelMode: 'WALKING'
  }, function (response, status) {
    // Route the directions and pass the response to a function to create
    // markers for each step.
    if (status === 'OK') {
      // document.getElementById('warnings-panel').innerHTML =
      //   '<b>' + response.routes[0].warnings + '</b>';
      // directionsRenderer.setDirections(response);
      // showSteps(response, markerArray, stepDisplay, map);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}

function showSteps(directionResult, markerArray, stepDisplay, map) {
  // For each step, place a marker, and add the text to the marker's infowindow.
  // Also attach the marker to an array so we can keep track of it and remove it
  // when calculating new routes.
  var myRoute = directionResult.routes[0].legs[0];
  for (var i = 0; i < myRoute.steps.length; i++) {
    var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
    marker.setMap(map);
    marker.setPosition(myRoute.steps[i].start_location);
    attachInstructionText(
      stepDisplay, marker, myRoute.steps[i].instructions, map);
  }
}

function attachInstructionText(stepDisplay, marker, text, map) {
  google.maps.event.addListener(marker, 'click', function () {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

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
        initMap(google, map)
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