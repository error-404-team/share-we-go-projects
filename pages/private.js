import { Map, ConnectApiMaps } from '../lib/maps';
import SearchMap from '../components/SearchMap';
import SearchBar from '../components/SearchBar';
import {writeUserData,writeGEOLocationData} from '../firebase-database/write-data';
import '../css/map.css';
import '../css/styles.css';

require('es6-promise').polyfill();
require('isomorphic-fetch');

class Private extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...props }
    }

    componentDidMount() {

        fetch('http://localhost:7000/position').then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (stories) {
            let {uid, displayName, email, photoURL, phoneNumber, coords, timestamp} =stories;
            writeGEOLocationData(uid, displayName, email, photoURL, phoneNumber, coords, timestamp)
            console.log(stories);
            
        });

        fetch('http://localhost:7000/users').then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (stories) {
            let {uid, displayName, email, photoURL, phoneNumber} = stories;
            writeUserData(uid, displayName, email, photoURL, phoneNumber)
            console.log(stories);
            
        })
    }

    render() {
        // ค้นหา ตัวแปล google และ position ใน this.props
        var { google } = this.props;

        // กำหนดตัวแปล latlng
        let latlng;

        fetch('http://localhost:7000/position').then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function (stories) {
            latlng = { lat: stories.coords.latitude, lng: stories.coords.longitude }
        })

        if (latlng == undefined) {
            // แทนค่า ตัวแปล latlng ลงไป
            latlng = { lat: 14.013235199999999, lng: 100.6985216 }

        }

        return (
            <Map google={google}
                opts={{
                    zoom: 15,
                    center: { lat: latlng.lat, lng: latlng.lat },
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
                setCenter={new google.maps.LatLng(latlng.lat, latlng.lng)}
                DrawingOnMap={(google, map) => {
                    function CustomMarker(latlng, map, args, img) {
                        this.latlng = latlng;
                        this.args = args;
                        this.img = img;
                        this.setMap(map);



                    }

                    CustomMarker.prototype = new google.maps.OverlayView();

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
                            innerDiv.innerHTML = `<img  src="${this.img}" style="border-radius: inherit;width: 20px;height: 20px;margin: 2px;
                        "/>`
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

                    // var myLatlng = new google.maps.LatLng(latlng.lat, latlng.lng);

                    // console.log(myLatlng);

                    // var marker1 = new CustomMarker(
                    //     myLatlng,
                    //     map,
                    //     {}
                    // );


                    // ระบุทำแหน่งปัจจุบัย
                    // if (navigator.geolocation) {
                    //     navigator.geolocation.watchPosition(function (position) {
                    //         var pos = {
                    //             lat: position.coords.latitude,
                    //             lng: position.coords.longitude
                    //         };

                    //         marker1.latlng = { lat: pos.lat, lng: pos.lng };
                    //         marker1.draw();

                    //         map.setCenter(pos);
                    //     }, function () {
                    //         handleLocationError(true, infoWindow, map.getCenter());
                    //     });
                    // } else {
                    //     // Browser doesn't support Geolocation
                    //     handleLocationError(false, infoWindow, map.getCenter());

                    // }

                    fetch('http://localhost:7000/position').then(function (response) {
                        if (response.status >= 400) {
                            throw new Error("Bad response from server");
                        }
                        return response.json();
                    })
                        .then(function (stories) {
                            var myLatlng = new google.maps.LatLng(stories.coords.latitude, stories.coords.longitude);

                            var marker1 = new CustomMarker(
                                myLatlng,
                                map,
                                {},
                                stories.photoURL
                            );

                            var pos = {
                                lat: stories.coords.latitude,
                                lng: stories.coords.longitude
                            };

                            marker1.latlng = { lat: pos.lat, lng: pos.lng };
                            marker1.draw();

                            map.setCenter(pos);

                            // console.log(stories);
                        });

                }}
            >
                <SearchBar >
                    <SearchMap {...this.props} />
                </SearchBar>
            </Map>
        )
    }
}

export default ConnectApiMaps({
    apiKey: "AIzaSyCrGaroYIOPAu9IakE6gEzY2sa5t23mCpQ",
    libraries: ['places', 'geometry'],
})(Private)