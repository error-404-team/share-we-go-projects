import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { camelize } from '../../lib/String';
import { makeCancelable } from '../../lib/cancelablePromise';

const inlineStyles = {
    position: "absolute",
    overflow: "hidden",
    height: "100%",
    width: "100%",
}

const evtNames = [
    'bounds_changed',
    'center_changed',
    'click',
    'dblclick',
    'drag',
    'dragend',
    'dragstart',
    'heading_changed',
    'idle',
    'maptypeid_changed',
    'mousemove',
    'mouseout',
    'mouseover',
    'projection_changed',
    'rightclick',
    'tilesloaded',
    'tilt_changed',
    'zoom_changed'
];


class GoogleMap extends React.Component {
    constructor(props) {
        super(props)

        if (!props.hasOwnProperty('google')) {
            throw new Error('You must include a `google` prop');
        }

        this.listeners = {};
        this.state = {
            currentLocation: {
                lat: this.props.initialCenter.lat,
                lng: this.props.initialCenter.lng
            },
            map: null
        };
    }

    componentDidMount() {
        if (this.props.centerAroundCurrentLocation) {
            if (navigator && navigator.geolocation) {
                this.geoPromise = makeCancelable(
                    new Promise((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    })
                );

                this.geoPromise.promise
                    .then(pos => {
                        const coords = pos.coords;
                        this.setState({
                            currentLocation: {
                                lat: coords.latitude,
                                lng: coords.longitude
                            }
                        });
                    })
                    .catch(e => e);
            }
        }
        this.loadMap();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.google !== this.props.google) {
            this.loadMap();
        }
        if (this.props.visible !== prevProps.visible) {
            this.restyleMap();
        }
        if (this.props.zoom !== prevProps.zoom) {
            this.map.setZoom(this.props.zoom);
        }
        if (this.props.center !== prevProps.center) {
            this.setState({
                currentLocation: this.props.center
            });
        }
        if (prevState.currentLocation !== this.state.currentLocation) {
            this.recenterMap();
        }
        if (this.props.bounds && this.props.bounds !== prevProps.bounds) {
            this.map.fitBounds(this.props.bounds);
        }
    }

    componentWillUnmount() {
        const { google } = this.props;
        if (this.geoPromise) {
            this.geoPromise.cancel();
        }
        Object.keys(this.listeners).forEach(e => {
            google.maps.event.removeListener(this.listeners[e]);
        });
    }

    loadMap() {
        if (this.props && this.props.google) {
            const { google, opts, getBounds, getCenter, getClickableIcons,
                getDiv, getHeading, getMapTypeId, getProjection, getStreetView,
                getTilt, getZoom, fitBounds, panBy, panTo, panToBounds, setCenter,
                setClickableIcons, setHeading, setMapTypeId, setOptions, setStreetView,
                setTilt, setZoom, DrawingOnMap } = this.props;
            const maps = google.maps;

            this.setState({ map: google.maps.Map })

            const mapRef = this.ref_map;
            const mapDiv = ReactDOM.findDOMNode(mapRef);

            this.map = new maps.Map(mapDiv, opts);

            if (DrawingOnMap) {
                DrawingOnMap(google, this.map)
            }
            if (getBounds) {
                getBounds(this.map.getBounds())
            }
            if (getCenter) {
                getCenter(this.map.getCenter())
            }
            if (getClickableIcons) {
                getClickableIcons(this.map.getClickableIcons())
            }
            if (getDiv) {
                getDiv(this.map.getDiv())
            }
            if (getHeading) {
                getHeading(this.map.getHeading())
            }
            if (getMapTypeId) {
                getMapTypeId(this.map.getMapTypeId())
            }
            if (getProjection) {
                getProjection(this.map.getProjection())
            }
            if (getStreetView) {
                getStreetView(this.map.getStreetView())
            }
            if (getTilt) {
                getTilt(this.map.getTilt())
            }
            if (getZoom) {
                getZoom(this.map.getZoom())
            }
            if (fitBounds) {
                this.map.fitBounds(fitBounds)
            }
            if (panBy) {
                this.map.panBy(panBy)
            }
            if (panTo) {
                this.map.panTo(panTo)
            }
            if (panToBounds) {
                this.map.panToBounds(panToBounds)
            }
            if (setCenter) {
                this.map.setCenter(setCenter)
            }
            if (setClickableIcons) {
                this.map.setClickableIcons(setClickableIcons)
            }
            if (setHeading) {
                this.map.setHeading(setHeading)
            }
            if (setMapTypeId) {
                this.map.setMapTypeId(setMapTypeId)
            }
            if (setOptions) {
                this.map.setOptions(setOptions)
            }
            if (setStreetView) {
                this.map.setStreetView(setStreetView)
            }
            if (setTilt) {
                this.map.setTilt(setTilt)
            }
            if (setZoom) {
                this.map.setZoom(setZoom)
            }

            evtNames.forEach(e => {
                this.listeners[e] = this.map.addListener(e, this.handleEvent(e));
            });
            maps.event.trigger(this.map, 'ready');
            this.forceUpdate();
        }
    }

    handleEvent(evtName) {
        let timeout;
        const handlerName = `on${camelize(evtName)}`;

        return e => {
            if (timeout) {
                clearTimeout(timeout);
                timeout = null;
            }
            timeout = setTimeout(() => {
                if (this.props[handlerName]) {
                    this.props[handlerName](this.props, this.map, e);
                }
            }, 0);
        };
    }

    recenterMap() {
        const map = this.map;

        const { google } = this.props;

        if (!google) return;
        const maps = google.maps;

        if (map) {
            let center = this.state.currentLocation;
            if (!(center instanceof google.maps.LatLng)) {
                center = new google.maps.LatLng(center.lat, center.lng);
            }
            // map.panTo(center)
            map.setCenter(center);
            maps.event.trigger(map, 'recenter');
        }
    }

    restyleMap() {
        if (this.map) {
            const { google } = this.props;
            google.maps.event.trigger(this.map, 'resize');
        }
    }

    renderChildren() {
        const { children } = this.props;

        if (!children) return;

        return React.Children.map(children, c => {
            if (!c) return;
            return React.cloneElement(c, {
                map: this.map,
                google: this.props.google
            });
        });
    }

    render() {

        return (
            <React.Fragment>
                <div ref={ref => (this.ref_map = ref)} style={inlineStyles} ></div>
                {this.renderChildren()}
            </React.Fragment>
        )
    }
}

GoogleMap.propTypes = {
    DrawingOnMap: PropTypes.func.isRequired,
    google: PropTypes.object,
    opts: PropTypes.shape({
        options: PropTypes.oneOfType([
            PropTypes.element,
            PropTypes.shape({
                backgroundColor: PropTypes.string,
                center: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.shape({
                        lat: PropTypes.number,
                        lng: PropTypes.number,
                        noWrap: PropTypes.bool
                    }),
                    PropTypes.shape({
                        lat: PropTypes.number,
                        lng: PropTypes.number
                    }),
                    PropTypes.func,
                    PropTypes.object
                ]),
                clickableIcons: PropTypes.bool,
                controlSize: PropTypes.number,
                disableDefaultUI: PropTypes.bool,
                disableDoubleClickZoom: PropTypes.bool,
                draggable: PropTypes.bool,
                draggableCursor: PropTypes.string,
                draggingCursor: PropTypes.string,
                fullscreenControl: PropTypes.bool,
                fullscreenControlOptions: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.object,
                    PropTypes.func,
                    PropTypes.shape({
                        position: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.func,
                            PropTypes.string
                        ])
                    })
                ]),
                gestureHandling: PropTypes.string,
                heading: PropTypes.number,
                keyboardShortcuts: PropTypes.bool,
                mapTypeControl: PropTypes.bool,
                mapTypeControlOptions: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.object,
                    PropTypes.func,
                    PropTypes.shape({
                        mapTypeIds: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.func,
                            PropTypes.string
                        ]),
                        position: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.func,
                            PropTypes.string
                        ]),
                        style: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.func,
                            PropTypes.string
                        ]),

                    })
                ]),
                mapTypeId: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.func,
                    PropTypes.string
                ]),
                maxZoom: PropTypes.number,
                minZoom: PropTypes.number,
                noClear: PropTypes.bool,
                panControl: PropTypes.bool,
                panControlOptions: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.object,
                    PropTypes.func,
                    PropTypes.shape({
                        position: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.func,
                            PropTypes.string
                        ])
                    })
                ]),
                restriction: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.object,
                    PropTypes.func,
                    PropTypes.shape({
                        position: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.func,
                            PropTypes.string,
                            PropTypes.object,
                            PropTypes.shape({
                                latLngBounds: PropTypes.oneOfType([
                                    PropTypes.element,
                                    PropTypes.func,
                                    PropTypes.object,
                                    PropTypes.shape({
                                        latLngBounds: PropTypes.oneOfType([
                                            PropTypes.element,
                                            PropTypes.shape({
                                                sw: PropTypes.oneOfType([
                                                    PropTypes.element,
                                                    PropTypes.object,
                                                    PropTypes.shape({
                                                        lat: PropTypes.number,
                                                        lng: PropTypes.number,
                                                        noWrap: PropTypes.bool
                                                    }),
                                                    PropTypes.shape({
                                                        lat: PropTypes.number,
                                                        lng: PropTypes.number
                                                    }),
                                                    PropTypes.func
                                                ]),
                                                ne: PropTypes.oneOfType([
                                                    PropTypes.element,
                                                    PropTypes.object,
                                                    PropTypes.shape({
                                                        lat: PropTypes.number,
                                                        lng: PropTypes.number,
                                                        noWrap: PropTypes.bool
                                                    }),
                                                    PropTypes.shape({
                                                        lat: PropTypes.number,
                                                        lng: PropTypes.number
                                                    }),
                                                    PropTypes.func
                                                ])
                                            }),
                                        ])
                                    }),
                                    PropTypes.shape({
                                        east: PropTypes.number,
                                        north: PropTypes.number,
                                        south: PropTypes.number,
                                        west: PropTypes.number,
                                    })
                                ]),
                                strictBounds: PropTypes.bool
                            })
                        ])
                    })
                ]),
                rotateControl: PropTypes.bool,
                rotateControlOptions: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.func,
                    PropTypes.object,
                    PropTypes.shape({
                        position: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.func,
                            PropTypes.string
                        ])
                    })
                ]),
                scrollwheel: PropTypes.bool,
                streetView: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.shape({
                        container: PropTypes.element,
                        opts: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.object,
                            PropTypes.func,
                            PropTypes.shape({
                                addressControl: PropTypes.bool,
                                addressControlOptions: PropTypes.oneOfType([
                                    PropTypes.element,
                                    PropTypes.object,
                                    PropTypes.func,
                                    PropTypes.shape({
                                        position: PropTypes.oneOfType([
                                            PropTypes.element,
                                            PropTypes.func,
                                            PropTypes.string
                                        ])
                                    })
                                ]),
                                clickToGo: PropTypes.bool,
                                controlSize: PropTypes.number,
                                disableDefaultUI: PropTypes.bool,
                                disableDoubleClickZoom: PropTypes.bool,
                                enableCloseButton: PropTypes.bool,
                                fullscreenControl: PropTypes.bool,
                                fullscreenControlOptions: PropTypes.oneOfType([
                                    PropTypes.element,
                                    PropTypes.object,
                                    PropTypes.func,
                                    PropTypes.shape({
                                        position: PropTypes.oneOfType([
                                            PropTypes.element,
                                            PropTypes.func,
                                            PropTypes.string
                                        ])
                                    })
                                ]),
                                imageDateControl: PropTypes.bool,
                                linksControl: PropTypes.bool,
                                motionTracking: PropTypes.bool,
                                motionTrackingControl: PropTypes.bool,
                                motionTrackingControlOptions: PropTypes.oneOfType([
                                    PropTypes.element,
                                    PropTypes.object,
                                    PropTypes.func,
                                    PropTypes.shape({
                                        position: PropTypes.oneOfType([
                                            PropTypes.element,
                                            PropTypes.func,
                                            PropTypes.string
                                        ])
                                    })
                                ]),
                                panControl: PropTypes.bool,
                                panControlOptions: PropTypes.oneOfType([
                                    PropTypes.element,
                                    PropTypes.object,
                                    PropTypes.func,
                                    PropTypes.shape({
                                        position: PropTypes.oneOfType([
                                            PropTypes.element,
                                            PropTypes.func,
                                            PropTypes.string
                                        ])
                                    })
                                ]),
                                pano: PropTypes.string,
                                position: PropTypes.oneOfType([
                                    PropTypes.element,
                                    PropTypes.object,
                                    PropTypes.func,
                                    PropTypes.shape({
                                        lat: PropTypes.number,
                                        lng: PropTypes.number,
                                        noWrap: PropTypes.bool
                                    }),
                                    PropTypes.shape({
                                        lat: PropTypes.number,
                                        lng: PropTypes.number
                                    })
                                ]),
                                pov: PropTypes.oneOfType([
                                    PropTypes.element,
                                    PropTypes.object,
                                    PropTypes.func,
                                    PropTypes.shape({
                                        heading: PropTypes.number,
                                        pitch: PropTypes.number
                                    })
                                ]),
                                scrollwheel: PropTypes.bool,
                                showRoadLabels: PropTypes.bool,
                                visible: PropTypes.bool,
                                zoom: PropTypes.number,
                                zoomControl: PropTypes.bool,
                                zoomControlOptions: PropTypes.oneOfType([
                                    PropTypes.element,
                                    PropTypes.object,
                                    PropTypes.func,
                                    PropTypes.shape({
                                        position: PropTypes.oneOfType([
                                            PropTypes.element,
                                            PropTypes.func,
                                            PropTypes.string
                                        ])
                                    })
                                ])
                            })
                        ])
                    }),
                    PropTypes.func,
                    PropTypes.object
                ]),
                streetViewControlOptions: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.object,
                    PropTypes.func,
                    PropTypes.shape({
                        position: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.func,
                            PropTypes.string
                        ])
                    })
                ]),
                styles: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.object,
                    PropTypes.func,
                    PropTypes.shape({
                        elementType: PropTypes.string,
                        featureType: PropTypes.string,
                        stylers: PropTypes.arrayOf(PropTypes.object)
                    })
                ]),
                tilt: PropTypes.number,
                zoom: PropTypes.number,
                zoomControl: PropTypes.bool,
                zoomControlOptions: PropTypes.oneOfType([
                    PropTypes.element,
                    PropTypes.object,
                    PropTypes.func,
                    PropTypes.shape({
                        position: PropTypes.oneOfType([
                            PropTypes.element,
                            PropTypes.func,
                            PropTypes.string
                        ])
                    })
                ])
            }),
            PropTypes.func,
            PropTypes.object,
            PropTypes.element
        ])
    }),
    fitBounds: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.shape({
            bounds: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.shape({
                    lat: PropTypes.number,
                    lng: PropTypes.number,
                    noWrap: PropTypes.bool
                }),
                PropTypes.shape({
                    lat: PropTypes.number,
                    lng: PropTypes.number
                }),
                PropTypes.func,
                PropTypes.object
            ]),
            padding: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.number,
                PropTypes.shape({
                    bottom: PropTypes.number,
                    left: PropTypes.number,
                    right: PropTypes.number,
                    top: PropTypes.number
                }),
                PropTypes.func,
                PropTypes.object
            ])
        })
    ]),
    getBounds: PropTypes.func,
    getCenter: PropTypes.func,
    getClickableIcons: PropTypes.func,
    getDiv: PropTypes.func,
    getHeading: PropTypes.func,
    getMapTypeId: PropTypes.func,
    getProjection: PropTypes.func,
    getStreetView: PropTypes.func,
    getTilt: PropTypes.func,
    getZoom: PropTypes.func,
    panBy: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number
        })
    ]),
    panTo: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
            noWrap: PropTypes.bool
        }),
        PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        }),
        PropTypes.func,
        PropTypes.object
    ]),
    panToBounds: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.shape({
            latLngBounds: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.object,
                PropTypes.shape({
                    sw: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.shape({
                            lat: PropTypes.number,
                            lng: PropTypes.number,
                            noWrap: PropTypes.bool
                        }),
                        PropTypes.shape({
                            lat: PropTypes.number,
                            lng: PropTypes.number
                        }),
                        PropTypes.func
                    ]),
                    ne: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.shape({
                            lat: PropTypes.number,
                            lng: PropTypes.number,
                            noWrap: PropTypes.bool
                        }),
                        PropTypes.shape({
                            lat: PropTypes.number,
                            lng: PropTypes.number
                        }),
                        PropTypes.func
                    ])
                }),
                PropTypes.shape({
                    east: PropTypes.number,
                    north: PropTypes.number,
                    south: PropTypes.number,
                    west: PropTypes.number,
                }),
                PropTypes.func
            ]),
            padding: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.number,
                PropTypes.shape({
                    bottom: PropTypes.number,
                    left: PropTypes.number,
                    right: PropTypes.number,
                    top: PropTypes.number
                }),
                PropTypes.func
            ])
        })
    ]),
    setCenter: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
            noWrap: PropTypes.bool
        }),
        PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        }),
        PropTypes.func,
        PropTypes.object
    ]),
    setClickableIcons: PropTypes.bool,
    setHeading: PropTypes.number,
    setMapTypeId: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.func,
        PropTypes.string
    ]),
    setOptions: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.shape({
            backgroundColor: PropTypes.string,
            center: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.shape({
                    lat: PropTypes.number,
                    lng: PropTypes.number,
                    noWrap: PropTypes.bool
                }),
                PropTypes.shape({
                    lat: PropTypes.number,
                    lng: PropTypes.number
                }),
                PropTypes.func,
                PropTypes.object
            ]),
            clickableIcons: PropTypes.bool,
            controlSize: PropTypes.number,
            disableDefaultUI: PropTypes.bool,
            disableDoubleClickZoom: PropTypes.bool,
            draggable: PropTypes.bool,
            draggableCursor: PropTypes.string,
            draggingCursor: PropTypes.string,
            fullscreenControl: PropTypes.bool,
            fullscreenControlOptions: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.object,
                PropTypes.func,
                PropTypes.shape({
                    position: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.func,
                        PropTypes.string
                    ])
                })
            ]),
            gestureHandling: PropTypes.string,
            heading: PropTypes.number,
            keyboardShortcuts: PropTypes.bool,
            mapTypeControl: PropTypes.bool,
            mapTypeControlOptions: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.object,
                PropTypes.func,
                PropTypes.shape({
                    mapTypeIds: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.func,
                        PropTypes.string
                    ]),
                    position: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.func,
                        PropTypes.string
                    ]),
                    style: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.func,
                        PropTypes.string
                    ]),

                })
            ]),
            mapTypeId: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.func,
                PropTypes.string
            ]),
            maxZoom: PropTypes.number,
            minZoom: PropTypes.number,
            noClear: PropTypes.bool,
            panControl: PropTypes.bool,
            panControlOptions: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.object,
                PropTypes.func,
                PropTypes.shape({
                    position: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.func,
                        PropTypes.string
                    ])
                })
            ]),
            restriction: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.object,
                PropTypes.func,
                PropTypes.shape({
                    position: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.func,
                        PropTypes.string,
                        PropTypes.object,
                        PropTypes.shape({
                            latLngBounds: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.func,
                                PropTypes.object,
                                PropTypes.shape({
                                    latLngBounds: PropTypes.oneOfType([
                                        PropTypes.element,
                                        PropTypes.shape({
                                            sw: PropTypes.oneOfType([
                                                PropTypes.element,
                                                PropTypes.object,
                                                PropTypes.shape({
                                                    lat: PropTypes.number,
                                                    lng: PropTypes.number,
                                                    noWrap: PropTypes.bool
                                                }),
                                                PropTypes.shape({
                                                    lat: PropTypes.number,
                                                    lng: PropTypes.number
                                                }),
                                                PropTypes.func
                                            ]),
                                            ne: PropTypes.oneOfType([
                                                PropTypes.element,
                                                PropTypes.object,
                                                PropTypes.shape({
                                                    lat: PropTypes.number,
                                                    lng: PropTypes.number,
                                                    noWrap: PropTypes.bool
                                                }),
                                                PropTypes.shape({
                                                    lat: PropTypes.number,
                                                    lng: PropTypes.number
                                                }),
                                                PropTypes.func
                                            ])
                                        }),
                                    ])
                                }),
                                PropTypes.shape({
                                    east: PropTypes.number,
                                    north: PropTypes.number,
                                    south: PropTypes.number,
                                    west: PropTypes.number,
                                })
                            ]),
                            strictBounds: PropTypes.bool
                        })
                    ])
                })
            ]),
            rotateControl: PropTypes.bool,
            rotateControlOptions: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.func,
                PropTypes.object,
                PropTypes.shape({
                    position: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.func,
                        PropTypes.string
                    ])
                })
            ]),
            scrollwheel: PropTypes.bool,
            streetView: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.shape({
                    container: PropTypes.element,
                    opts: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.func,
                        PropTypes.shape({
                            addressControl: PropTypes.bool,
                            addressControlOptions: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.object,
                                PropTypes.func,
                                PropTypes.shape({
                                    position: PropTypes.oneOfType([
                                        PropTypes.element,
                                        PropTypes.func,
                                        PropTypes.string
                                    ])
                                })
                            ]),
                            clickToGo: PropTypes.bool,
                            controlSize: PropTypes.number,
                            disableDefaultUI: PropTypes.bool,
                            disableDoubleClickZoom: PropTypes.bool,
                            enableCloseButton: PropTypes.bool,
                            fullscreenControl: PropTypes.bool,
                            fullscreenControlOptions: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.object,
                                PropTypes.func,
                                PropTypes.shape({
                                    position: PropTypes.oneOfType([
                                        PropTypes.element,
                                        PropTypes.func,
                                        PropTypes.string
                                    ])
                                })
                            ]),
                            imageDateControl: PropTypes.bool,
                            linksControl: PropTypes.bool,
                            motionTracking: PropTypes.bool,
                            motionTrackingControl: PropTypes.bool,
                            motionTrackingControlOptions: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.object,
                                PropTypes.func,
                                PropTypes.shape({
                                    position: PropTypes.oneOfType([
                                        PropTypes.element,
                                        PropTypes.func,
                                        PropTypes.string
                                    ])
                                })
                            ]),
                            panControl: PropTypes.bool,
                            panControlOptions: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.object,
                                PropTypes.func,
                                PropTypes.shape({
                                    position: PropTypes.oneOfType([
                                        PropTypes.element,
                                        PropTypes.func,
                                        PropTypes.string
                                    ])
                                })
                            ]),
                            pano: PropTypes.string,
                            position: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.object,
                                PropTypes.func,
                                PropTypes.shape({
                                    lat: PropTypes.number,
                                    lng: PropTypes.number,
                                    noWrap: PropTypes.bool
                                }),
                                PropTypes.shape({
                                    lat: PropTypes.number,
                                    lng: PropTypes.number
                                })
                            ]),
                            pov: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.object,
                                PropTypes.func,
                                PropTypes.shape({
                                    heading: PropTypes.number,
                                    pitch: PropTypes.number
                                })
                            ]),
                            scrollwheel: PropTypes.bool,
                            showRoadLabels: PropTypes.bool,
                            visible: PropTypes.bool,
                            zoom: PropTypes.number,
                            zoomControl: PropTypes.bool,
                            zoomControlOptions: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.object,
                                PropTypes.func,
                                PropTypes.shape({
                                    position: PropTypes.oneOfType([
                                        PropTypes.element,
                                        PropTypes.func,
                                        PropTypes.string
                                    ])
                                })
                            ])
                        })
                    ])
                }),
                PropTypes.func,
                PropTypes.object
            ]),
            streetViewControlOptions: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.object,
                PropTypes.func,
                PropTypes.shape({
                    position: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.func,
                        PropTypes.string
                    ])
                })
            ]),
            styles: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.object,
                PropTypes.func,
                PropTypes.shape({
                    elementType: PropTypes.string,
                    featureType: PropTypes.string,
                    stylers: PropTypes.arrayOf(PropTypes.object)
                })
            ]),
            tilt: PropTypes.number,
            zoom: PropTypes.number,
            zoomControl: PropTypes.bool,
            zoomControlOptions: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.object,
                PropTypes.func,
                PropTypes.shape({
                    position: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.func,
                        PropTypes.string
                    ])
                })
            ])
        }),
        PropTypes.func,
        PropTypes.object,
        PropTypes.element
    ]),
    setStreetView: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.shape({
            container: PropTypes.element,
            opts: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.object,
                PropTypes.func,
                PropTypes.shape({
                    addressControl: PropTypes.bool,
                    addressControlOptions: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.func,
                        PropTypes.shape({
                            position: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.func,
                                PropTypes.string
                            ])
                        })
                    ]),
                    clickToGo: PropTypes.bool,
                    controlSize: PropTypes.number,
                    disableDefaultUI: PropTypes.bool,
                    disableDoubleClickZoom: PropTypes.bool,
                    enableCloseButton: PropTypes.bool,
                    fullscreenControl: PropTypes.bool,
                    fullscreenControlOptions: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.func,
                        PropTypes.shape({
                            position: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.func,
                                PropTypes.string
                            ])
                        })
                    ]),
                    imageDateControl: PropTypes.bool,
                    linksControl: PropTypes.bool,
                    motionTracking: PropTypes.bool,
                    motionTrackingControl: PropTypes.bool,
                    motionTrackingControlOptions: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.func,
                        PropTypes.shape({
                            position: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.func,
                                PropTypes.string
                            ])
                        })
                    ]),
                    panControl: PropTypes.bool,
                    panControlOptions: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.func,
                        PropTypes.shape({
                            position: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.func,
                                PropTypes.string
                            ])
                        })
                    ]),
                    pano: PropTypes.string,
                    position: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.func,
                        PropTypes.shape({
                            lat: PropTypes.number,
                            lng: PropTypes.number,
                            noWrap: PropTypes.bool
                        }),
                        PropTypes.shape({
                            lat: PropTypes.number,
                            lng: PropTypes.number
                        })
                    ]),
                    pov: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.func,
                        PropTypes.shape({
                            heading: PropTypes.number,
                            pitch: PropTypes.number
                        })
                    ]),
                    scrollwheel: PropTypes.bool,
                    showRoadLabels: PropTypes.bool,
                    visible: PropTypes.bool,
                    zoom: PropTypes.number,
                    zoomControl: PropTypes.bool,
                    zoomControlOptions: PropTypes.oneOfType([
                        PropTypes.element,
                        PropTypes.object,
                        PropTypes.func,
                        PropTypes.shape({
                            position: PropTypes.oneOfType([
                                PropTypes.element,
                                PropTypes.func,
                                PropTypes.string
                            ])
                        })
                    ])
                })
            ])
        }),
        PropTypes.func,
        PropTypes.object
    ]),
    setTilt: PropTypes.number,
    setZoom: PropTypes.number
}

evtNames.forEach(e => (GoogleMap.propTypes[camelize(e)] = PropTypes.func));

GoogleMap.defaultProps = {
    zoom: 14,
    initialCenter: {
        lat: 37.774929,
        lng: -122.419416
    },
    center: {},
    centerAroundCurrentLocation: false,
    style: {},
    containerStyle: {},
    visible: true
}


export default GoogleMap;