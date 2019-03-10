// @flow

import React, {Component} from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './styles.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});


const breweryIcon = L.icon({
    iconUrl: require('./assets/brewery-marker.png'),
    shadowUrl: require('./assets/marker-shadow.png'),
    iconSize: [35, 40], // size of the icon
    shadowSize: [43, 31], // size of the shadow
    iconAnchor: [23, 40], // point of the icon which will correspond to marker's location
    shadowAnchor: [2, 30], // the same for the shadow
    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
});


type State = {
    lat: number,
    lng: number,
    zoom: number,
};

type Props = {
    breweries: ?Array<Object>,
    location: ?Object
};

export default class TeamMap extends Component<Props, State> {

    state = {
        isExpanded: false,
        lat: 44,
        lng: -72.5890947,
        zoom: 8,
        showTowns: true,
        showTrashDrops: true,
        showCollectedTrashDrops: true,
        showPickups: false,
        showDropOffs: false,
        showTeams: true
    };

    render() {
        const {breweries, location} = this.props;
        const {lat, lng, showTowns} = this.state;
        const positionLat = location.lat;
        const positionLng = location.lng;
        const position = [positionLat, positionLng];
        const breweryMarkers = breweries
            .map(drop => {
                const breweryLocation = {lat: ((drop || {}).location || {}).lat, lng: ((drop || {}).location || {}).lng};
                return (breweryLocation.lat && breweryLocation.lng) ? (
                    <Marker icon={breweryIcon}
                            key={(drop || {}).id}
                            position={breweryLocation}
                    >
                        <Popup>
                            {'Beer Here!'}
                        </Popup>
                    </Marker>
                ) : null;
            });
        return (
            <div className={'beer-map'}>
                <div className={'beer-map--wrapper'}>
                    <Map center={position} zoom={this.state.zoom}>
                        <TileLayer url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}.png'/>
                        {breweryMarkers}
                    </Map>
                </div>
            </div>
        );
    }
}
