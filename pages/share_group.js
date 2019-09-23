import React from 'react';
import Router, { useRouter } from 'next/router';
import { Map, ConnectApiMaps } from '../lib/maps';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MoreIcon from '@material-ui/icons/MoreVert';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import firebase from '../lib/firebase';
import { shareLocation, writeHistory } from '../firebase-database/write-data'
// import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';

// import 'react-chat-widget/lib/styles.css';
// import '../css/place-autocomplete-and-directions.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

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

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

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

        if (data.share === true) {
          me.setupPlaceChangedListener(data.host.geocoded_waypoints[0].place_id, 'ORIG');
          me.setupPlaceChangedListener(data.host.geocoded_waypoints[1].place_id, 'DEST');
          me.setupClickListener(data.host.request.travelMode);

        } else {
          me.setupPlaceChangedListener(data.header.host.geocoded_waypoints[0].place_id, 'ORIG');
          me.setupPlaceChangedListener(data.header.host.geocoded_waypoints[1].place_id, 'DEST');
          me.setupClickListener(data.header.host.request.travelMode);
        }


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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [joinUser, setJoinUser] = React.useState({})
  const router = useRouter()

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase.database().ref(`/group_share_user/${user.uid}`).once('value').then(function (snapshot) {
          let data = (snapshot.val());
          writeHistory(user.uid, data)
        })

        shareLocation(user.uid, false)
        setAnchorEl(null);
        setTimeout(() => router.push('/'), 100)
      }
    })
  }

  function goBack() {
    setTimeout(() => router.push('/'), 100)
  }

  console.log(joinUser);


  return (
    <div className={classes.root}>
      <CssBaseline />

      {/* app-bar */}
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton onClick={goBack} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <ArrowBackIosIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            Photos
        </Typography>
          <div className={classes.grow} />
          <IconButton onClick={handleClick} edge="end" color="inherit">
            <MoreIcon />
          </IconButton>

          {/* menu */}
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <StyledMenuItem onClick={handleClose}>
              <ListItemIcon>
                <CloseIcon />
              </ListItemIcon>
              <ListItemText primary="ยกเลิก" />
            </StyledMenuItem>
          </StyledMenu>
          {/* end-menu */}

        </Toolbar>
      </AppBar>
      {/* end-app-bar */}

      {/* map */}
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


          function CustomMarker(latlng, map, args, img) {
            this.latlng = latlng;
            this.args = args;
            this.img = img;
            this.setMap(map);

            // setMap(map)
            // setGoogle(google)

          }

          CustomMarker.prototype = new window.google.maps.OverlayView();

          CustomMarker.prototype.onAdd = function () {
            var self = this;
            var div = this.div;
            if (!div) {
              // Generate marker html
              div = this.div = document.createElement('div');
              div.className = 'custom-marker';
              div.style.position = 'absolute';
              var innerDiv = document.createElement('div');
              innerDiv.className = 'custom-marker-inner';
              innerDiv.innerHTML = `<img  src="${this.img}" style="border-radius: inherit;width: 20px;height: 20px;margin: 2px;"/>`
              div.appendChild(innerDiv);

              if (typeof (self.args.marker_id) !== 'undefined') {
                div.dataset.marker_id = self.args.marker_id;
              }

              google.maps.event.addDomListener(div, "click", function (event) {
                google.maps.event.trigger(self, "click");
              });

              var panes = this.getPanes();
              panes.overlayImage.appendChild(div);
            }
          };

          CustomMarker.prototype.draw = function () {
            // มี bug icon ไม่เกาะ map
            if (this.div) {
              // กำหนด ตำแหน่ง ของhtml ที่สร้างไว้
              let positionA = new google.maps.LatLng(this.latlng.lat, this.latlng.lng);

              this.pos = this.getProjection().fromLatLngToDivPixel(positionA);
              // console.log(this.pos);
              this.div.style.left = this.pos.x + 'px';
              this.div.style.top = this.pos.y + 'px';
            }
          };

          CustomMarker.prototype.getPosition = function () {
            return this.latlng;
          };

          firebase.auth().onAuthStateChanged((user) => {
            firebase.database().ref(`/group_share_user/${user.uid}/header`).once('value').then(function (snapshot) {
              let stories = (snapshot.val());

              let myLatlng = new google.maps.LatLng(stories.coords.latitude, stories.coords.longitude);

              let marker1 = new CustomMarker(
                myLatlng,
                map,
                {},
                stories.photoURL
              );

              let pos = {
                lat: stories.coords.latitude,
                lng: stories.coords.longitude
              };

              marker1.latlng = { lat: pos.lat, lng: pos.lng };
              marker1.draw();

              map.setCenter(pos);

            })

            // join
            firebase.database().ref(`/group_share_user/${user.uid}/header/uid`).once('value').then(function (snapshot) {
              let hid = (snapshot.val());
              firebase.database().ref(`/group_share_user/${hid}/join/keys`).once('value').then(function (snapshot) {
                let keysJoin = (snapshot.val());
                console.log(Object.keys(keysJoin).length);

                Object.keys(keysJoin).map((key) => {
                  firebase.database().ref(`/group_share_user/${hid}/join/user/${key}`).once('value').then(function (snapshot) {
                    let dataJoin = (snapshot.val());
                    setJoinUser([dataJoin])
                    let myLatlng = new google.maps.LatLng(dataJoin.coords.latitude, dataJoin.coords.longitude);
                    let marker1 = new CustomMarker(
                      myLatlng,
                      map,
                      {},
                      dataJoin.photoURL
                    );

                    let pos = {
                      lat: dataJoin.coords.latitude,
                      lng: dataJoin.coords.longitude
                    };

                    marker1.latlng = { lat: pos.lat, lng: pos.lng };
                    marker1.draw();

                    map.setCenter(pos);
                  })
                })
              })
            })
          })
        }}
      >
      </Map>
      {/* end-map */}
    
    </div>
  )

}

export default ConnectApiMaps({
  apiKey: "AIzaSyCfdx1_dkKY9BejzU-We23YqfEynZtAIJc",
  libraries: ['places', 'geometry'],
})(FinishedStep)