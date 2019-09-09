import React from 'react';
import { Map, ConnectApiMaps } from '../lib/maps';
import '../css/place-autocomplete-and-directions.css';

function initMap(google, map) {
    // this.map = map;
    var markerArray = []; 

    var modeSelector = document.getElementById('mode-selector');
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);

    var directionsService = new google.maps.DirectionsService;

     // Create a renderer for directions and bind it to the map.
     var directionsRenderer = new google.maps.DirectionsRenderer({map: map});

     // Instantiate an info window to hold step text.
     var stepDisplay = new google.maps.InfoWindow;

     // Display the route between the initial start and end selections.
     calculateAndDisplayRoute(directionsRenderer, directionsService, markerArray, stepDisplay, map);

     var onChangeHandler = function() {
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
  }, function(response, status) {
    // Route the directions and pass the response to a function to create
    // markers for each step.
    if (status === 'OK') {
      document.getElementById('warnings-panel').innerHTML =
          '<b>' + response.routes[0].warnings + '</b>';
      directionsRenderer.setDirections(response);
      showSteps(response, markerArray, stepDisplay, map);
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
  google.maps.event.addListener(marker, 'click', function() {
    // Open an info window when the marker is clicked on, containing the text
    // of the step.
    stepDisplay.setContent(text);
    stepDisplay.open(map, marker);
  });
}

function FinishedStep(props) {


    return (
        <Map google={props.google}
            setStyle={{
                position: "absolute",
                overflow: "hidden",
                height: "85%",
                width: "100%",
            }}
            opts={{
                zoom: 15,
                center: { lat: -33.8688, lng: 151.2195 },
                disableDefaultUI: false,
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
                   <br/>
                   <p>ปลายทาง: -</p>
                   <br/>
                   <p>เวลา: -</p>
                </div>
            </div>
        </Map>
    )

}

export default ConnectApiMaps({
    apiKey: "AIzaSyCrGaroYIOPAu9IakE6gEzY2sa5t23mCpQ",
    libraries: ['places', 'geometry'],
})(FinishedStep)