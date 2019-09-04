import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { camelize } from '../../../lib/String';

const evtNames = [
    'animation_changed',
    'click',
    'clickable_changed',
    'cursor_changed',
    'dblclick',
    'drag',
    'dragend',
    'draggable_changed',
    'dragstart',
    'flat_changed',
    'icon_changed',
    'mousedown',
    'mouseout',
    'mouseover',
    'mouseup',
    'position_changed',
    'rightclick',
    'shape_changed',
    'title_changed',
    'visible_changed',
    'zindex_changed'
];

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

export class Marker extends React.Component {

    componentDidMount() {
        this.markerPromise = wrappedPromise();
        this.renderMarker();
    }

    componentDidUpdate(prevProps) {
        if ((this.props.map !== prevProps.map) ||
            (this.props.position !== prevProps.position) ||
            (this.props.icon !== prevProps.icon)) {
            if (this.marker) {
                this.marker.setMap(null);
            }
            this.renderMarker();
        }
    }

    componentWillUnmount() {
        if (this.marker) {
            this.marker.setMap(null);
        }
    }

    renderMarker() {
        const {
            map, google, opts, getAnimation, getClickable, getCursor, getDraggable, getIcon,
            getLabel, getMap, getMarker, getOpacity, getPosition, getShape, getTitle, getVisible,
            getZIndex, setAnimation, setClickable, setCursor, setDraggable, setIcon, setLabel,
            setOpacity, setOptions, setPosition, setShape, setTitle, setVisible, setZIndex
        } = this.props;
        if (!google) {
            return null
        }
        opts.map = map
        this.marker = new google.maps.Marker(opts);

        if (getAnimation) {
            getAnimation(this.marker.getAnimation())
        }
        if (getClickable) {
            getClickable(this.marker.getClickable())
        }

        if (getCursor) {
            getCursor(this.marker.getCursor())
        }
        if (getDraggable) {
            getDraggable(this.marker.getDraggable())
        }
        if (getIcon) {
            getIcon(this.marker.getIcon())
        }
        if (getLabel) {
            getLabel(this.marker.getLabel())
        }
        if (getMap) {
            getMap(this.marker.getMap())
        }
        if (getMarker) {
            getMarker(this.marker.getMarker())
        }
        if (getOpacity) {
            getOpacity(this.marker.getOpacity())
        }
        if (getPosition) {
            getPosition(this.marker.getPosition())
        }
        if (getShape) {
            getShape(this.marker.getShape())
        }
        if (getTitle) {
            getTitle(this.marker.getTitle())
        }
        if (getVisible) {
            getVisible(this.marker.getVisible())
        }
        if (getZIndex) {
            getZIndex(this.marker.getZIndex())
        }
        if (setAnimation) {
            this.marker.setAnimation(setAnimation)
        }
        if (setClickable) {
            this.marker.setClickable(setClickable)
        }
        if (setCursor) {
            this.marker.setCursor(setCursor)
        }
        if (setDraggable) {
            this.marker.setDraggable(setDraggable)
        }
        if (setIcon) {
            this.marker.setIcon(setIcon)
        }
        if (setLabel) {
            this.marker.setLabel(setLabel)
        }
        if (setOpacity) {
            this.marker.setOpacity(setOpacity)
        }
        if (setOptions) {
            this.marker.setOptions(setOptions)
        }
        if (setPosition) {
            this.marker.setPosition(setPosition)
        }
        if (setShape) {
            this.marker.setShape(setShape)
        }
        if (setTitle) {
            this.marker.setTitle(setTitle)
        }
        if (setVisible) {
            this.marker.setVisible(setVisible)
        }
        if (setZIndex) {
            this.marker.setZIndex(setZIndex)
        }

        evtNames.forEach(e => {
            this.marker.addListener(e, this.handleEvent(e));
        });

        this.markerPromise.resolve(this.marker);
    }

    getMarker() {
        return this.markerPromise;
    }

    handleEvent(evt) {
        return (e) => {
            const evtName = `on${camelize(evt)}`
            if (this.props[evtName]) {
                this.props[evtName](this.props, this.marker, e);
            }
        }
    }

    render() {
        return (
            <Fragment>
                {this.props.children && this.marker ?
                    React.Children.only(
                        React.cloneElement(
                            this.props.children,
                            {
                                marker: this.marker,
                                google: this.props.google,
                                map: this.props.map
                            }
                        )
                    ) : null
                }
            </Fragment>
        )
    }
}

Marker.propTypes = {
    opts: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.func
    ]),
    getAnimation: PropTypes.func,
    getClickable: PropTypes.func,
    getCursor: PropTypes.func,
    getDraggable: PropTypes.func,
    getIcon: PropTypes.func,
    getLabel: PropTypes.func,
    getMap: PropTypes.func,
    getOpacity: PropTypes.func,
    getPosition: PropTypes.func,
    getShape: PropTypes.func,
    getTitle: PropTypes.func,
    getVisible: PropTypes.func,
    getZIndex: PropTypes.func,
    setAnimation: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.func
    ]),
    setClickable: PropTypes.bool,
    setCursor: PropTypes.string,
    setDraggable: PropTypes.bool,
    setIcon: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.func,
        PropTypes.string
    ]),
    setLabel: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.func,
        PropTypes.string
    ]),
    setMap: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.func
    ]),
    setOpacity: PropTypes.number,
    setOptions: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.func
    ]),
    setPosition: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.func
    ]),
    setShape: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.object,
        PropTypes.func
    ]),
    setTitle: PropTypes.string,
    setVisible: PropTypes.bool,
    setZIndex: PropTypes.number
}

evtNames.forEach(e => Marker.propTypes[e] = PropTypes.func)

Marker.defaultProps = {
    name: 'Marker'
}

export default Marker