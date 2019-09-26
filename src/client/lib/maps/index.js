import GoogleMap from './components/Map';
import {connect as ApiMapsComponent} from './components/ConnectApiMaps';
import _Marker from './components/drawing/Marker';
import _OverlayView from './components/drawing/OverlayView';


export const Map = GoogleMap;
export const ConnectApiMaps = ApiMapsComponent;
export const Marker = _Marker;
export const OverlayView = _OverlayView;