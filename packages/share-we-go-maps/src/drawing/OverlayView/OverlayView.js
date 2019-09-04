import React, { Fragment } from 'react';
import ReactDOM from "react-dom";
// import invariant from "invariant"
import PropTypes from 'prop-types';
// import render from 'preact-render-to-string';
// import _ from "lodash";
// import { getOffsetOverride, getLayoutStyles } from "./dom-helper"
import prettyFormat from "pretty-format";
import renderer from "react-test-renderer";
import './style.css'
const { ReactTestComponent } = prettyFormat.plugins;

const wrappedPromise = function () {
  var wrappedPromise = {},
    promise = new Promise(function (resolve, reject) {
      wrappedPromise.resolve = resolve;
      wrappedPromise.reject = reject;
    });
  wrappedPromise.then = promise.then.bind(promise);
  wrappedPromise.catch = promise.catch.bind(promise);
  wrappedPromise.promise = promise;

  return wrappedPromise;
}

export class OverlayView extends React.Component {
  componentDidMount() {
    this.overlayViewPromise = wrappedPromise();
    this.renderOverlayView();
  }

  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map)) {
      if (this.overlayView) {
        this.overlayView.setMap(null);
      }
      this.renderOverlayView();
    }
  }

  componentWillUnmount() {
    if (this.overlayView) {
      this.overlayView.setMap(null);
    }
  }

  renderOverlayView() {
    const {
      google,
    } = this.props;

    if (!google) {
      return null
    }

    function USGSOverlay(elementType, setPaneName, latlng, bounds, children, map, args) {
      // this.google = google;
      this.elementType = elementType;
      this.latlng = latlng;
      this.bounds = bounds;
      this.map = map;
      this.args = args;
      this.setPaneName = setPaneName;
      this.children = children;
      this.setMap(map);


    }

    USGSOverlay.prototype = new window.google.maps.OverlayView;

    USGSOverlay.prototype.onAdd = function () {
      var self = this;
      var div = this.div;
      // const { google } = this.props
      // if (this.elementType) {
      // Generate marker html
      div = this.div = document.createElement(`${this.elementType}`);
      div.className = 'custom-marker';
      div.style.position = 'absolute';
      this.innerDiv = document.createElement('div');
      this.innerDiv.className = 'custom-marker-inner';
      this.innerDiv.innerHTML = prettyFormat(renderer.create(this.children), {
        plugins: [ReactTestComponent],
        printFunctionName: false
      });

      this.div.appendChild(this.innerDiv);
      // google.maps.OverlayView.preventMapHitsFrom(this.innerDiv);

      if (typeof (self.args.marker_id) !== 'undefined') {
        this.elementType.dataset.marker_id = self.args.marker_id;
      }

      google.maps.event.addDomListener(div, "click", function (event) {
        google.maps.event.trigger(self, "click");
      });

      var panes = this.getPanes();
      panes[this.setPaneName].appendChild(div);
      // }
    }

    USGSOverlay.prototype.draw = function () {
      // const { google } = this.props
      // if (this.innerDiv) {
      let position = new google.maps.LatLng(this.latlng.lat, this.latlng.lng);
      var pos = this.getProjection().fromLatLngToDivPixel(position);
      console.log(position);

      this.div.style.left = pos.x + 'px';
      this.div.style.top = pos.y + 'px';
      // }

      // console.log(this.latlng);

      // if (this.div.style.display !== this.display) {
      //   this.div.style.display = this.display;
      // }
    }

    USGSOverlay.prototype.getPosition = function () {
      return this.latlng;
    }

    USGSOverlay.prototype.onRemove = function () {
      this.div.parentNode.removeChild(this.innerDiv);
      this.div = null;
    };

    var myLatlng = new google.maps.LatLng(this.props.position.lat, this.props.position.lng);

    // var USGSOverlay = this.renderOverlayView()

    var overlayView = new USGSOverlay(
      this.props.elementType,
      this.props.setPaneName,
      myLatlng,
      this.props.bounds,
      this.props.children,
      this.props.map,
      {},
    );

    // overlayView.setMap(this.props.map)
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        overlayView.latlng = pos
        // map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());

    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      // infoWindow.setPosition(pos);
      // infoWindow.setContent(browserHasGeolocation ?
      //     'Error: The Geolocation service failed.' :
      //     'Error: Your browser doesn\'t support geolocation.');
      // infoWindow.open(map);
    }
  }






  render() {

this.renderOverlayView()
    // var positions = [{ lat:position.lat, lng:position.lng }]
    // positions.push({ lat:position.lat, lng:position.lng })
    // console.log(positions);

    // this.renderOverlayView().latlng = { lat: position.lat, lng: position.lng };
    // overlayView.draw;
    // this.renderOverlayView().setMap(this.props.map)
    // setInterval(function () {
    //   console.log({ lat:position.lat, lng:position.lng });
    //   overlayView.latlng = { lat:position.lat, lng:position.lng }
    //   // overlayView.draw();
    // }, 1000);

    return (
      <Fragment>
        {this.props.children ? (
          React.Children.only(
            React.cloneElement(
              this.props.children,
              {
                google: this.props.google,
                map: this.props.map
              }
            )
          )) : null
        }
      </Fragment>
    )
  }

}

OverlayView.propTypes = {
  elementType: PropTypes.string,
  setPaneName: PropTypes.string,
  position: PropTypes.object,
  bounds: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default OverlayView;