import React, { Component } from 'react';
// import styled from 'styled-components';
import InputBase from '@material-ui/core/InputBase'
import PropsTypes from 'prop-types';
import './style.css'

// const Wrapper = styled.div`
//   position: relative;
//   align-items: center;
//   justify-content: center;
//   width: 100%;
//   padding: 20px;
// `;

class Autocomplete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    componentDidMount({ map, google } = this.props) {

        this.input = this.searchInput
        this.searchBox = new google.maps.places.SearchBox(this.input)
        // map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.input)

        // map.addListener('bounds_changed', function () {
        //     this.searchBox.setBounds(map.getBounds());
        // });

        // this.markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        this.searchBox.addListener('places_changed', this.onPlaceChanged);
    }

    update(e) {
        this.setState({ value: e.target.value })
        // console.log(e.target.value);

    }

    onPlaceChanged = ({ google, map } = this.props) => {
        var markers = []
        // this.map = map
        var places = this.searchBox.getPlaces();
        // console.log(places);

        if (places.length == 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        console.log(bounds);
        
        map.fitBounds(bounds);
    }

    onFocus() {
        this.searchInput.value = ''
    }

    render() {


        return (
            <div
                style={this.props.style}
                className="MuiInputBase-root"
            >
                <input
                    ref={(ref) => {
                        this.searchInput = ref;
                    }}
                    className="MuiInputBase-input"
                    type="text"
                    onChange={this.update.bind(this)}
                    placeholder="Enter a location"
                    value={this.state.value}
                    onFocus={this.onFocus.bind(this)}

                />
            </div>
        );
    }
}

Autocomplete.propsTypes = {
    google: PropsTypes.object,
    map: PropsTypes.object,
    setPlace: PropsTypes.func.isRequired,
    style: PropsTypes.object
}

export default Autocomplete;