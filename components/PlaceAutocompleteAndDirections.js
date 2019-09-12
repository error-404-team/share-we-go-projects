import React from 'react';
import { Map, ConnectApiMaps } from '../lib/maps';
import '../css/place-autocomplete-and-directions.css';

function initMap(google, map) {
    // var map = new google.maps.Map(docType, {
    //     mapTypeControl: false,
    //     center: { lat: -33.8688, lng: 151.2195 },
    //     zoom: 13
    // });

    new AutocompleteDirectionsHandler(google, map);
}
/**
 * @constructor
 */
function AutocompleteDirectionsHandler(google, map) {
    this.map = map;
    this.originPlaceId = null;
    this.destinationPlaceId = null;
    this.travelMode = 'WALKING';
    this.directionsService = new google.maps.DirectionsService;
    this.directionsRenderer = new google.maps.DirectionsRenderer;
    this.directionsRenderer.setMap(map);

    var originInput = document.getElementById('origin-input');
    var destinationInput = document.getElementById('destination-input');
    var modeSelector = document.getElementById('mode-selector');

    originInput.style.position = "relative";
    originInput.style.top = "50px";
    originInput.style.left = "0px";

    var originAutocomplete = new google.maps.places.Autocomplete(originInput);
    // Specify just the place data fields that you need.
    originAutocomplete.setFields(['place_id']);

    var destinationAutocomplete = new google.maps.places.Autocomplete(destinationInput);
    // Specify just the place data fields that you need.
    destinationAutocomplete.setFields(['place_id']);

    this.setupClickListener('changemode-walking', 'WALKING');
    this.setupClickListener('changemode-transit', 'TRANSIT');
    this.setupClickListener('changemode-driving', 'DRIVING');

    this.setupPlaceChangedListener(originAutocomplete, 'ORIG');
    this.setupPlaceChangedListener(destinationAutocomplete, 'DEST');

    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    this.map.controls[google.maps.ControlPosition.LEFT_TOP].push(destinationInput);
    this.map.controls[google.maps.ControlPosition.TOP_RIGHT].push(modeSelector);
}

// Sets a listener on a radio button to change the filter type on Places
// Autocomplete.
AutocompleteDirectionsHandler.prototype.setupClickListener = function (
    id, mode) {
    var radioButton = document.getElementById(id);
    var me = this;

    radioButton.addEventListener('click', function () {
        me.travelMode = mode;
        me.route();
    });
};

AutocompleteDirectionsHandler.prototype.setupPlaceChangedListener = function (
    autocomplete, mode) {
    var me = this;
    autocomplete.bindTo('bounds', this.map);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();

        if (!place.place_id) {
            alert('Please select an option from the dropdown list.');
            return;
        }
        if (mode === 'ORIG') {
            me.originPlaceId = place.place_id;
        } else {
            me.destinationPlaceId = place.place_id;
        }
        me.route();
    });
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
            } else {
                alert('Directions request failed due to ' + status);
            }
        });
};

function PlaceAutocompleteAndDirections(props) {


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
                <input id="origin-input" className="controls" type="text"
                    placeholder="Enter an origin location"
                    style={{ zIndex: 0, position: 'relative', top: '50px', }}
                />
                <input id="destination-input" className="controls" type="text"
                    placeholder="Enter a destination location" />

                <div id="mode-selector" className="controls">
                    <input type="radio" name="type" id="changemode-walking" />
                    <label htmlFor="changemode-walking">Walking</label>
                    <br />
                    <input type="radio" name="type" id="changemode-transit" />
                    <label htmlFor="changemode-transit">Transit</label>
                    <br />
                    <input type="radio" name="type" id="changemode-driving" checked="checked" />
                    <label htmlFor="changemode-driving">Driving</label>
                </div>
            </div>
        </Map>
    )

}

export default ConnectApiMaps({
    apiKey: "AIzaSyCrGaroYIOPAu9IakE6gEzY2sa5t23mCpQ",
    libraries: ['places', 'geometry'],
})(PlaceAutocompleteAndDirections)